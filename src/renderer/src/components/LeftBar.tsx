import React from 'react'

export default function LeftBar(): JSX.Element {
  return (
    <div className="h-screen ">
      <div className="h-3/6 bg-slate-50 p-1 ">
        <h2>Chats</h2>
      </div>
      <div className="h-3/6 bg-slate-100 p-1">
        <h2>Models</h2>
      </div>
    </div>
  )
}
