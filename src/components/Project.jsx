import { Link } from "react-router-dom"
import Identicons from "react-identicons"

const Project = () => {
  return (
    <div className='flex flex-col px-6 bg-amber-50'>
      <div className="flex justify-center items-center flex-wrap"> 
      {Array(6)
      .fill()
      .map((card, i)=>(
      <ProjectCard key={i} id={i} project={card} />
      ))}
      </div>
       

    </div>
  )
}

const ProjectCard = ({project, id}) =>(
  <div id="projects" className="rounded-lg shadow-lg bg-white
   m-4 w-64"> 
   <Link to={'/projects/' + id}>
    <img src="https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"
    alt="project title" 
    className="rounded-xl h-64 w-full object-cover"
    />
    <div className="p-4 bg-lime-50">
      <h5> Creating a Household Robot</h5>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <Identicons
          className='rounded-full'
           string="0x15..2e5"
          size={25} />
          <small className="text-gray-700">0x15..2e5</small>
        </div>
        <small className="text-gray-500">
          2 days left
        </small>
      </div>
      <div className="w-full bg-gray-300"> 
        <div className="bg-lime-600 text text-xs font-medium
        text-lime-100 text-center p-0.5 leading-none rounded-l-full
        "
        style={{width : '50%'}}
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