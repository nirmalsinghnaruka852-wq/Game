
import { Routes ,Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import GamePage from "./Page/GamePage";

function App() {
  

  return (<>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/game" element={<GamePage/>}/>
  </Routes>
  </>
  )
}

export default App
