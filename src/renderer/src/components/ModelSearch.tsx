import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { useEffect, useRef, useState } from 'react'
import * as cheerio from 'cheerio'
import { useModelStore } from '@renderer/stores/useModelsStore'
import { contents } from '../../../../node_modules/cheerio/dist/browser/api/traversing'
import { SearchList } from './SearchList'
import { IModel } from '@renderer/interfaces/IModel'

export const ModelSearch: React.FC = () => {
  const { showModal, hideModal, getInfoModal } = useModalsContext()
  const { modelName, setModelName } = useModelStore()
  const [query, setQuery] = useState<string>('')
  const [foundModels, setFoundModels] = useState<string[]>([])
  const [modelParameters, setModelParameters] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const selectRef = useRef<HTMLSelectElement>(null)

  const { title } = getInfoModal(MODALS.MODEL_SEARCH).modalProps

  // useEffect(() => {
  //   console.log(modelParameters)
  // }, [modelParameters])

  const handleSearch = async (): Promise<void> => {
    setIsSearching(true)
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    const response = await fetch(`https://ollama.com/library?q=${query}&sort=popular`, {})
    const $ = await cheerio.load(await response.text())

    const models = $('h2')
    setFoundModels([])
    setModelParameters([])
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
    setModelParameters([])
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

  const handleUseModel = (): void => {
    const selectedModel = selectRef.current?.value
    if (selectedModel) {
      setModelName(selectedModel)
      hideModal(MODALS.MODEL_SEARCH, title || '')
    }
  }

  return (
    <div className="absolute z-[999] bg-slate-400 w-svw bg-opacity-60 transition-opacity duration-300  h-svh flex justify-center items-center ">
      <div className="w-5/6 h-5/6 border bg-white border-gray-300">
        <div className="w-full bg-slate-700 text-white flex justify-between items-center p-4">
          <div className="font-bold">{title}</div>

          <button
            className="font-extrabold"
            type="button"
            onClick={() => {
              hideModal(MODALS.MODEL_SEARCH, title || '')
            }}
          >
            &#9587;
          </button>
        </div>
        <div className="m-2 h-full">
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
          {foundModels.length > 1 && (
            <div className="flex flex-col justify-center items-center h-3/6 ">
              <SearchList models={foundModels} onClick={handleParameterGet} />
            </div>
          )}
          {modelParameters.length > 0 && (
            <div className="flex flex-col justify-center items-center mt-5">
              Select model to use
              <select className="mt-2" ref={selectRef}>
                {modelParameters.map((model: string) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="mt-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
                onClick={handleUseModel}
              >
                Use Model
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
