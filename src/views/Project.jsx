import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackProject from "../components/BackProject"
import DeleteProject from "../components/DeleteProject"
import ProjectBackers from "../components/ProjectBackers"
import ProjectDetails from "../components/ProjectDetails"
import UpdateProject from "../components/UpdateProject"
import { listBackers, loadProject } from "../services/blockchain"
import { useGlobalState } from "../store"

const Project = () => {
  const [project] = useGlobalState('project')
  const [backers] = useGlobalState('backers')
  const { id } = useParams()
  console.log("project backer", backers)


  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await loadProject(id)
    await listBackers(id)
    setLoaded(true)
  }, [])
  return loaded ? (
    <>
      <ProjectDetails project={project} />
      <ProjectBackers backers={backers} />
      <UpdateProject project={project} />
      <BackProject project={project} />
      <DeleteProject project={project} />
    </>
  ) : null
}

export default Project