import React from 'react'
import Models from './Models'
import { Conversations } from './Conversations'

export default function LeftBar(): JSX.Element {
  return (
    <div className="h-screen p-2">
      <div className="h-3/6 bg-slate-50 p-1 border">
        <Conversations />
      </div>
      <div className="h-3/6 bg-slate-100 p-1 border">
        <Models />
      </div>
    </div>
  )
}
