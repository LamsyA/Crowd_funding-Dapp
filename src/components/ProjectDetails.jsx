import Identicons from 'react-identicons'
import {FaEthereum} from "react-icons/fa"
import { setGlobalState } from '../store'

const ProjectDetails = () => {
  return (
    <div className="pt-24 mb-5 px-5 flex justify-center">
       <div className='flex justify-center flex-col md:w-2/3' >
       <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
             <img src="https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"
                    alt="project title" 
                    className="rounded-xl h-64 object-cover sm:w-1/3 w-full  "
                    />
            <div className="flex-1 sm:py-0 py-4 ">
                <div className="flex flex-col justify-start flex-wrap">
                    <h5 className="text-gray-900 text-sm font-medium mb-2">
                        Creating a Household Robot</h5>
                    <small className="text-gray-500">3 days left</small>
                </div>

                <div className="flex justify-between items-center w-full pt-1">
                    <div className="flex justify-start space-x-2">
                        <Identicons 
                        className="rounded-full shadow-md" 
                        string="ox96e...12ac1"  size={15}/>
                        <small className="text-gray-700">ox96e...12ac1</small>
                        <small className="text-gray-500 font-bold">{16} Backings</small>
                    </div>
                    <div className="font-bold">
                        <small className="text-gray-500 ">Open</small>

                    </div>
                </div>
            </div>
        </div>
        <p className='text-sm font-light sm:mt-3'>Testing this out this page for backing projects </p>
        <div className="w-full bg-gray-300 mt-4"> 
        <div className="bg-lime-600 text text-xs font-medium
        text-lime-100 text-center p-0.5 leading-none rounded-l-full
        "
        style={{width : '50%'}}
        ></div>
      </div>
      <div className='flex justify-between'>
      <small>{3} ETH Raised</small>
      <small className='flex justify-start item-center font-bold mt-2'>
        <FaEthereum/>
        <span> {10} ETH</span>
      </small>

      </div>

      <div className="flex justify-start items-center space-x-2 mt-4">
   <button type='button'
            className='inline-block bg-lime-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-lime-600'
            onClick={()=> setGlobalState("backModal","scale-100")}
            
            > 
             Back Project
    </button>
    <button type='button'
            className='inline-block bg-gray-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-gray-600'
            onClick={()=> setGlobalState("updateModal","scale-100")}
            
            > 
             Edit 
    </button>
    <button type='button'
            className='inline-block bg-red-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-red-600'> 
             Delete 
    </button>
    <button type='button'
            className='inline-block bg-orange-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-orange-600'> 
             Pay Out
    </button>
   </div>
       </div>
    </div>
  )
}

export default ProjectDetails