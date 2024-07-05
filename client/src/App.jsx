import NavBar from "./components/NavBar"
import { Homepage } from "./routes/Homepage"

function App() {
  return (
    <div className="bg-background-color">  
        <div> 
            <NavBar />
            <Homepage />
        </div>
    </div>
  )
}

export default App
