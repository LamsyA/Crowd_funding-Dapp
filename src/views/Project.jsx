import BackProject from "../components/BackProject"
import ProjectBackers from "../components/ProjectBackers"
import ProjectDetails from "../components/ProjectDetails"
import UpdateProject from "../components/UpdateProject"

const Project = () => {
  return (
    <>
    <ProjectDetails />
    <ProjectBackers />
    <UpdateProject />
    <BackProject/>
    </>
  )
}

export default Project