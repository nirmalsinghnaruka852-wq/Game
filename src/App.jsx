
import { Routes ,Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import GamePage from "./Page/GamePage";
import { Router } from "./constants/route";

function App() {
  

  return (<>
  <Routes>
    <Route path={Router.Home} element={<HomePage/>}/>
    <Route path={Router.Game} element={<GamePage/>}/>
  </Routes>
  </>
  )
}

export default App
