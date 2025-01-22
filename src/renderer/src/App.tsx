import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'

function App(): JSX.Element {
  return (
    <div className="flex flex-row w-10/12">
      <div className="w-1/3">
        <LeftBar />
      </div>
      <div className="w-2/3">
        <RightBar />
      </div>
    </div>
  )
}

export default App
