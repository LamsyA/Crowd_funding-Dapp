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
    <div className='flex justify-center items-center my-5'>
    <div className='flex space-x-2 justify-center'>
            <button type='button'
            className='inline-block bg-lime-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-lime-600'> Load More</button>
        </div>
    </div>
    <CreateProject/>
    
    <AddButton />
    </>
  )
}

export default Home