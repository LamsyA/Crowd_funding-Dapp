import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import { isWalletConnected } from "./services/blockchain"
import Home from "./views/Home"
import Project from "./views/Project"
import Alert from "./alert/Alert"

const App = () => {
  const [loading, setLoading] = useState(false)
  useEffect(async () => {
    await isWalletConnected()
    setLoading(true)
  }, [])

  return (
    <div className="min-h-screen relative bg-amber-50">
      <Header />
      {loading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="projects/:id" element={<Project />} />

        </Routes>
      ) : null}


      <Alert />
    </div>
  )
}

export default App
