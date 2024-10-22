import notes from "./notes.json"
import './App.css'
import PianoKey from "./components/PianoKeys/PianoKey"


function App() {
  return (
    <>
    <div>
      {notes.map((n) => (
          <PianoKey note={n.note} type={n.type} frequency={n.frequency} bind_key={n.bind_button}></PianoKey>
      ))
      }
    </div>
    </>
  )
}

export default App
