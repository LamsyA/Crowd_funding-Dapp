import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteProject } from '../services/blockchain'
import { useGlobalState, setGlobalState, setAlert, setLoadingMsg } from '../store'

const DeleteProject = ({ project }) => {
    const [deleteModal] = useGlobalState('deleteModal')

    // const nav = useNavigate();
    const handleSubmit = async () => {

        try {
            setLoadingMsg("Deleting Project...")

            const result = await deleteProject({ id: project?.id })
            setGlobalState("deleteModal", "scale-0")
            if (result === true) {
                setAlert(`Project Successfully Deleted...`)
            }
            else { setAlert(`Error Deleting Project`, "red") }

        } catch (error) {
            setAlert(error.message, "red")
        }

    }
    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${deleteModal}`}>
            <div className='bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6'>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold '>{project?.title}</p>
                        <button type='button'
                            className='border-0 bg-transparent focus:outline-none '
                            onClick={() => setGlobalState("deleteModal", "scale-0")}

                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className='flex justify-center items-center mt-5'>
                        <div className='rounded-xl overflow-hidden h-20 w-20'>
                            <img src={project?.imageURL || "https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"}
                                alt={project?.title}
                                className=" h-full w-full cursor-pointer object-cover    "
                            />
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center 
            rounded-xl mt-5'>
                        <p> Are yo sure?</p>
                        <small className='text-red-500'> This is irreversible</small>
                    </div>



                    <button
                        onClick={handleSubmit}
                        className='inline-block bg-red-600 px-6 py-2.5 text-white
            font-medium  leading-tight text-md rounded-full 
            shadow-md hover:bg-red-700 mt-5'>
                        Delete Project
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProject