import { Link } from "react-router-dom"
import Identicons from "react-identicons"

const Project = () => {
  return (
    <div className='flex flex-col px-6 bg-amber-50'>
      <div className="flex justify-center items-center flex-wrap"> 
      {Array(6)
      .fill()
      .map((card, i)=>(
      <ProjectCard key={i} />
      ))}
      </div>
       

    </div>
  )
}

const ProjectCard = ({card, id}) =>(
  <div id="projects" className="rounded-lg shadow-lg bg-white
   m-4 w-64"> 
   <Link to={'/projects/' + id}>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2ZGKJNIItKnP1Wa4Q5pLIHHEF98FRv2KaA&usqp=CAU"
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
        h-1"
        style={{width : '50%'}}
        ></div>
      </div>
    </div>
     </Link>
   </div>
)

export default Project