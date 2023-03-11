import { useEffect } from "react"
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
  useEffect(async() =>{
    await loadProject(id)
  },[])
  return (
    <>
    <ProjectDetails project={project} />
    <ProjectBackers />
    <UpdateProject project={project} />
    <BackProject/>
    <DeleteProject/>
    </>
  )
}

export default Project