import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'
import { Modals } from './contexts/Modals'

function App(): JSX.Element {
  return (
    <Modals>
      <div className="flex flex-row w-10/12">
        <div className="w-1/3">
          <LeftBar />
        </div>
        <div className="w-2/3">
          <RightBar />
        </div>
      </div>
    </Modals>
  )
}

export default App
