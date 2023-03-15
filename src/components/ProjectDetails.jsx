import Identicons from 'react-identicons'
import { daysRemaining, truncate, useGlobalState } from "../store"
import { FaEthereum } from "react-icons/fa"
import { setGlobalState } from '../store'
import { pay } from '../services/blockchain'

const ProjectDetails = ({ project }) => {
  const [connectAccount] = useGlobalState('connectedAccount')
  const closed = new Date().getTime() > Number(project?.expiresAt + "000");

  return (
    <div className="pt-24 mb-5 px-5 flex justify-center">
      <div className='flex justify-center flex-col md:w-2/3' >
        <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
          <img src={project?.imageURL}
            alt={project?.title}
            className="rounded-xl h-64 object-cover sm:w-1/3 w-full  "
          />
          <div className="flex-1 sm:py-0 py-4 ">
            <div className="flex flex-col justify-start flex-wrap">
              <h5 className="text-gray-900 text-2xl font-medium mb-2">
                {project?.title}</h5>
              <small className="text-gray-500">
                {closed ? 'Expired' :
                  daysRemaining(project?.expiresAt) + " left"}
              </small>
            </div>

            <div className="flex justify-between items-center w-full pt-1">
              <div className="flex justify-start space-x-2">
                <Identicons
                  className="rounded-full shadow-md"
                  string={project?.owner} size={15} />
                {project?.owner ?
                  (<small className="text-gray-700">
                    {truncate(project?.owner, 5, 4, 11)}</small>) : null}
                <small className="text-gray-500 font-bold">
                  {project?.backers} Backer{project?.backers == 1 ? '' : 's'}</small>
              </div>
              <div className="font-bold">
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
            <div>
              <p className='text-sm font-light sm:mt-3'>{project?.description} </p>
              <div className="w-full bg-gray-300 mt-4 overflow-hidden">
                <div className="bg-lime-600 text text-xs font-medium
        text-lime-100 text-center p-0.5 leading-none rounded-l-full
        "
                  style={{ width: `${(project?.raised / project?.cost) * 100}%` }}
                ></div>
              </div>
              <div className='flex justify-between'>
                <small>{project?.raised} ETH Raised</small>
                <small className='flex justify-start item-center font-bold mt-2'>
                  <FaEthereum />
                  <span> {project?.cost} ETH</span>
                </small>

              </div>

              <div className="flex justify-start items-center space-x-2 mt-4">
                {project?.status == 0 ? (
                  <button type='button'
                    className='inline-block bg-lime-500 px-5 py-2 text-white
                    font-medium text-xs leading-tight uppercase rounded-full 
                    shadow-md hover:bg-lime-600'
                    onClick={() => setGlobalState("backModal", "scale-100")}

                  >
                    Back Project
                  </button>
                ) : null}

                {connectAccount == project?.owner ? (

                  project?.status != 3 ? (
                    project?.status == 1 ? (
                      <button type='button'
                        className='inline-block bg-orange-500 px-5 py-2 text-white
                    font-medium text-xs leading-tight uppercase rounded-full 
                    shadow-md hover:bg-orange-600'
                        onClick={() => pay}>
                        Pay Out
                      </button>
                    ) : project?.status != 4 ? (
                      <>
                        <button type='button'
                          className='inline-block bg-gray-500 px-5 py-2 text-white
                    font-medium text-xs leading-tight uppercase rounded-full 
                    shadow-md hover:bg-gray-600'
                          onClick={() => setGlobalState("updateModal", "scale-100")}

                        >
                          Edit
                        </button>
                        <button type='button'
                          className='inline-block bg-red-500 px-5 py-2 text-white
                                  font-medium text-xs leading-tight uppercase rounded-full 
                                  shadow-md hover:bg-red-600'
                          onClick={() => setGlobalState("deleteModal", "scale-100")}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-gray-600
                      text-white font-medium text-xs leading-tight uppercase
                      rounded-full shadow-md hover:bg-gray-700"
                      >
                        Project Closed
                      </button>
                    )
                  ) : null
                ) : null}


              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProjectDetails