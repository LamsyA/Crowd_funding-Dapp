import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { isWalletConnected } from "./services/blockchain"
import Home from "./views/Home"
import Project from "./views/Project"

const App = () => {
    useEffect(async() =>{
    await isWalletConnected()
  },[])

  return (
    <div className="min-h-screen relative bg-amber-50">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects/:id" element={<Project />} />

      </Routes>
    </div>
  )
}

export default App
