import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackProject from "../components/BackProject"
import DeleteProject from "../components/DeleteProject"
import ProjectBackers from "../components/ProjectBackers"
import ProjectDetails from "../components/ProjectDetails"
import UpdateProject from "../components/UpdateProject"
import { loadProject } from "../services/blockchain"
import { useGlobalState } from "../store"

const Project = () => {
  const {id} = useParams()
  
  const [project] = useGlobalState('project')
  const [loaded, setLoaded] = useState(false)
  useEffect(async() =>{
    await loadProject(id)
    setLoaded(true)
  },[])
  return loaded ?  (
    <>
    <ProjectDetails project={project} />
    <ProjectBackers />
    <UpdateProject project={project} />
    <BackProject/>
    <DeleteProject  project={project}/>
    </>
  ) : null
}

export default Project