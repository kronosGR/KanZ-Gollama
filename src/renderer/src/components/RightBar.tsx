import React from 'react'

export default function RightBar(): JSX.Element {
  return (
    <div className="h-[800px] w-full">
      <div className=" absolute bottom-3">
        <textarea className="border" cols={60} rows={10}></textarea>
      </div>
    </div>
  )
}
