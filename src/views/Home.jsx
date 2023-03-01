import { useEffect } from 'react'
import AddButton from '../components/AddButton'
import CreateProject from '../components/CreateProject'
import Hero from '../components/Hero'
import Project from '../components/Project'
import { listProjects } from '../services/blockchain'
import { useGlobalState } from '../store'



const Home = () => {
  const [projects] = useGlobalState('projects')
  useEffect(async () => {
    await listProjects() 
  }, [])
  
  return (
    < >
    <Hero />
    <Project projects = {projects} /> 
    <CreateProject/>
    
    <AddButton />
    </>
  )
}

export default Home