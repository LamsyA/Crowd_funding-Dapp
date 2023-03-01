import { Link } from "react-router-dom"
import Identicons from "react-identicons"
import { daysRemaining, truncate } from "../store"

const Project = ({projects}) => {
  return (
    <div className='flex flex-col px-6 bg-amber-50'>
      <div className="flex justify-center items-center flex-wrap"> 
      {projects.map((project, i)=>(
      <ProjectCard key={i} id={i} project={project} />
      ))}
      </div>
       

    </div>
  )
}

const ProjectCard = ({project, }) =>(
  <div id="projects" className="rounded-lg shadow-lg bg-white
   m-4 w-64"> 
   <Link to={'/projects/' + project.id}>
    <img src={project.imageURL}
    alt={project.title} 
    className="rounded-xl h-64 w-full object-cover"
    />
    <div className="p-4 bg-lime-50">
      <h5> {project.title} </h5>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <Identicons
          className='rounded-full'
           string={project.owner}
          size={25} />
          <small className="text-gray-700">{truncate(project.owner, 4,4,11)}</small>
        </div>
        <small className="text-gray-500">
          {new Date().getTime() > Number(project.expiresAt + "000") ? 'Expired' :
           daysRemaining(project.expiresAt)} {' '}left
        </small>
      </div>
      <div className="w-full bg-gray-300"> 
        <div className="bg-lime-600 text text-xs font-medium
        text-lime-100 text-center p-0.5 leading-none rounded-l-full
        "
        style={{width : `${(project.raised / project.cost)}%`}}
        ></div>
      </div>
      <div className="flex justify-between items-center flex-wrap
        mt-4 mb-2 text-gray-500 font-bold">
          <small >{14} Backers</small> 
          <div>
            <small className="text-lime-500">Open</small>
          </div>
        </div>
    </div>
     </Link>
   </div>
)

export default Project