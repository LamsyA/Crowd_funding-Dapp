import React from 'react'
import { FaTimes } from 'react-icons/fa'

const CreateProject = () => {
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 scale-100`}>
    <div className='bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6'>
        <form className='flex flex-col'> 
            <div className='flex justify-between items-center'>
                <p className='font-semibold '>Add Project</p>
            <button type='button'
            className='border-0 bg-transparent focus:outline-none '
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
            <div className='flex justify-between items-center bg-gray-300
            rounded-xl mt-5'>
                 <input
                 className='block w-full bg-transparent border-0
                 text-sm text-slate-500 focus:outline-none
                 focus:ring-0'
                 type='text'
                 name="title"
                 placeholder='Title'
                 required />
            </div>
            <div className='flex justify-between items-center bg-gray-300
            rounded-xl mt-5'>
                 <input
                 className='block w-full bg-transparent border-0
                 text-sm text-slate-500 focus:outline-none
                 focus:ring-0'
                 type='number'
                 step={0.01}
                 min={0.01}
                 name="amount"
                 placeholder='Amount {ETH}'
                 required />
            </div>
            <div className='flex justify-between items-center bg-gray-300
            rounded-xl mt-5'>
                 <input
                 className='block w-full bg-transparent border-0
                 text-sm text-slate-500 focus:outline-none
                 focus:ring-0'
                 type='date'
                 name="date"
                 placeholder='Expiration date'
                 required />
            </div>
            <div className='flex justify-between items-center bg-gray-300
            rounded-xl mt-5'>
                 <input
                 className='block w-full bg-transparent border-0
                 text-sm text-slate-500 focus:outline-none
                 focus:ring-0'
                 type='url'
                 name="imageURL"
                 placeholder='Image URL'
                 required />
            </div>
            <div className='flex justify-between items-center bg-gray-300
            rounded-xl mt-5'>
                 <textarea
                 className='block w-full bg-transparent border-0
                 text-sm text-slate-500 focus:outline-none
                 focus:ring-0'
                 type='text'
                 name="description"
                 placeholder='Description'
                 required ></textarea>
            </div>
            <button type='submit' 
            className='inline-block bg-lime-600 px-6 py-2.5 text-white
            font-medium  leading-tight text-md rounded-full 
            shadow-md hover:bg-lime-700 mt-5'> 
             Submit Project
            </button>
        </form>
    </div>
    </div>
  )
}

export default CreateProject