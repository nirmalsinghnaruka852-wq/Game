import {Route, Routes } from "react-router";
import HomePage from "./Page/HomePage";
function App() {
  return (
    <Routes>
      <Route  path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage/>}/>
    </Routes>

  )
}

export default App
