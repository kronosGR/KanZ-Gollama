import React from 'react'
import Models from './Models'

export default function LeftBar(): JSX.Element {
  return (
    <div className="h-screen p-2">
      <div className="h-3/6 bg-slate-50 p-1 border">
        <h2>Chats</h2>
      </div>
      <div className="h-3/6 bg-slate-100 p-1 border">
        <Models />
      </div>
    </div>
  )
}
