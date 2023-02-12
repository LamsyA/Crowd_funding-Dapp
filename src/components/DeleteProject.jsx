import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'

const DeleteProject = () => {
    const [deleteModal] = useGlobalState('deleteModal')
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${deleteModal}`}>
    <div className='bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6'>
        <form className='flex flex-col'> 
            <div className='flex justify-between items-center'>
                <p className='font-semibold '>#Project Title</p>
            <button type='button'
            className='border-0 bg-transparent focus:outline-none '
            onClick={()=> setGlobalState("deleteModal","scale-0")}
            
            >
                <FaTimes/>
            </button>
            </div>
            <div  className='flex justify-center items-center mt-5'>
                <div className='rounded-xl overflow-hidden h-20 w-20'>
                <img src="https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"
                    alt="project title" 
                    className=" h-full w-full cursor-pointer object-cover    "
                    />
                </div>
            </div>
           
            <div className='flex flex-col justify-center items-center 
            rounded-xl mt-5'>
                <p> Are yo sure?</p>
                <small className='text-red-500'> This is irreversible</small>
            </div>
            
            
           
            <button type='submit' 
            className='inline-block bg-red-600 px-6 py-2.5 text-white
            font-medium  leading-tight text-md rounded-full 
            shadow-md hover:bg-red-700 mt-5'> 
             Delete Project
            </button>
        </form>
    </div>
    </div>
  )
}

export default DeleteProject