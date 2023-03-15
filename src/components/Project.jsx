import { Link } from "react-router-dom"
import Identicons from "react-identicons"
import { daysRemaining, truncate } from "../store"
import { FaEthereum } from "react-icons/fa"
import { useState, useEffect } from "react"

const Project = ({ projects }) => {
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])


  const getCollection = () => projects.slice(0, end)

  useEffect(() => {
    setCollection(getCollection())
  }, [projects, end])


  return (
    <div className='flex flex-col px-6 bg-amber-50 mb-10'>
      <div className="flex justify-center items-center flex-wrap">
        {collection.map((project, i) => (
          <ProjectCard key={i} id={i} project={project} />
        ))}
      </div>
      {projects.length > collection.length ?
        (
          <div className='flex justify-center items-center my-5'>
            <div className='flex space-x-2 justify-center'>
              <button type='button'
                className='inline-block bg-lime-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-lime-600'
                onClick={() => setEnd(end + count)}
              > Load More</button>
            </div>
          </div>
        ) :
        null}


    </div>
  )
}

const ProjectCard = ({ project, }) => {
  const closed = new Date().getTime() > Number(project?.expiresAt + "000");
  return (
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
              <small className="text-gray-700">{truncate(project.owner, 4, 4, 11)}</small>
            </div>
            <small className="text-gray-500">
              {closed ? 'Expired' :
                daysRemaining(project.expiresAt) + " left"}
            </small>
          </div>
          <div className="w-full bg-gray-300 overflow-hidden">
            <div className="bg-lime-600 text text-xs font-medium
        text-lime-100 text-center p-0.5 leading-none rounded-l-full
        "
              style={{ width: `${(project.raised / project.cost) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between item-center font-bold mt-1
       text-gray-700 mb-2">
            <small>{project.raised} ETH Raised</small>
            <small className="flex justify-start items-center">
              <FaEthereum />
              <span>{project.cost} ETH</span>
            </small>
          </div>
          <div className="flex justify-between items-center flex-wrap
        mt-4 mb-2 text-gray-500 font-bold">
            <small >{project.backers} Backer{project.backers == 1 ? '' : 's'}</small>
            <div>
              {closed ? (
                <small className="text-red-700">Expired</small>
              ) :
                project?.status == 0 ? (
                  <small className="text-slate-600">Open</small>
                ) : project?.status == 1 ? (
                  <small className="text-lime-500">Accepted</small>
                ) : project?.status == 2 ? (
                  <small className="text-slate-500">Reverted</small>
                ) : project?.status == 3 ? (
                  <small className="text-red-500">Deleted</small>
                ) : (
                  <small className="text-orange-500">paid</small>
                )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Project