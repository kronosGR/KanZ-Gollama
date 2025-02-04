import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { useEffect, useState } from 'react'
import * as cheerio from 'cheerio'
import { useModelStore } from '@renderer/stores/useModelsStore'
import { contents } from '../../../../node_modules/cheerio/dist/browser/api/traversing'
import { SearchList } from './SearchList'

export const ModelSearch: React.FC = () => {
  const { showModal, hideModal, getInfoModal } = useModalsContext()
  const { title } = getInfoModal(MODALS.MODEL_SEARCH).modalProps
  const { models, getModels, isDownloading, setIsDownloading, isModelExists } = useModelStore()
  const [query, setQuery] = useState<string>('deep')
  const [foundModels, setFoundModels] = useState<string[]>([])
  const [modelParameters, setModelParameters] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    console.log(modelParameters)
  }, [modelParameters])

  const handleSearch = async (): Promise<void> => {
    setIsSearching(true)
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    const response = await fetch(`https://ollama.com/library?q=${query}&sort=popular`, {})
    const $ = await cheerio.load(await response.text())

    const models = $('h2')
    models.each((i, element) => {
      const txt = $(element).text().trim()
      if (txt) {
        setFoundModels((prv) => [...prv, txt])
      }
    })
    setIsSearching(false)
    hideModal(MODALS.LOADING_MODAL, 'Loading...')
  }

  const handleParameterGet: React.MouseEventHandler<HTMLDivElement> = async (e): Promise<void> => {
    setIsSearching(true)
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    const item = e.currentTarget.dataset.model
    // console.log('clicked', item)

    const response = await fetch(`https://ollama.com/library/${item}`, {})
    const $ = await cheerio.load(await response.text())

    const params = $(`a[href^="/library/${item}:"]`).each((i, link) => {
      const tmp = $(link).attr('href')?.replace('/library/', '')
      if (tmp) {
        setModelParameters((prv) => [...prv, tmp])
        // console.log(tmp)
      }
    })

    hideModal(MODALS.LOADING_MODAL, 'Loading...')
    setIsSearching(false)
  }

  return (
    <div className="absolute z-[999] bg-slate-400 w-svw bg-opacity-60 transition-opacity duration-300  h-svh flex justify-center items-center">
      <div className="w-5/6 h-5/6 border bg-white border-gray-300">
        <div className="w-full bg-slate-700 text-white flex justify-between items-center p-4">
          <div className="font-bold">{title}</div>

          <button
            className="font-extrabold"
            type="button"
            onClick={() => {
              hideModal(MODALS.MODEL_SETTINGS_MODAL, 'Model Search')
              showModal(MODALS.MODEL_SETTINGS_MODAL, { title: 'Model Settings' })
            }}
          >
            &#9587;
          </button>
        </div>
        <div className="m-2">
          <div className="flex justify-center items-center h-10 m-1">
            <label htmlFor="query">Search for </label>
            <input
              className="border m-2 border-gray-300 p-2 disabled:text-gray-400"
              type="text"
              id="query"
              name="query"
              value={query}
              onChange={(e) => {
                setQuery(e.currentTarget.value)
              }}
            ></input>
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
              onClick={handleSearch}
              disabled={isSearching}
            >
              Search Model
            </button>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <SearchList models={foundModels} onClick={handleParameterGet} />
          </div>
        </div>
      </div>
    </div>
  )
}
