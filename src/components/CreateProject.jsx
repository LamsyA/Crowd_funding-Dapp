import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createNewProject } from '../services/blockchain'
import { setAlert, setLoadingMsg, useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
    const [createModal] = useGlobalState('createModal')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [date, setDate] = useState('')
    const [imageURL, setImageURL] = useState('')

    const toTimestamp = (dateData) => {
        const dateObj = Date.parse(dateData)
        return dateObj / 1000
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description || !cost || !date || !imageURL) return

        setLoadingMsg("Creating Project...")
        try {
            const data = {
                title,
                description,
                imageURL,
                cost,
                expiresAt: toTimestamp(date)
            }
            console.log(data)

            const result = await createNewProject(data)
            if (result === true) {
                setAlert(`${title} Successfully Added...`)
            }
            else { setAlert(`Error adding ${title}`, "red") }
            
            onClose()
        } catch (error) {
            setAlert(error.message, "red")
        }

    }

    const onClose = () => {
        setGlobalState("createModal", "scale-0")
        resetParam()
    }
    const resetParam = () => {
        setTitle('')
        setCost('')
        setDescription('')
        setImageURL('')
        setDate('')
    }



    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}>
            <div className='bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold '>Add Project</p>
                        <button type='button'
                            className='border-0 bg-transparent focus:outline-none '
                            onClick={onClose}

                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className='flex justify-center items-center mt-5'>
                        <div className='rounded-xl overflow-hidden h-20 w-20'>
                            <img src={imageURL || "https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"}
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
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
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
                            name="cost"
                            placeholder='cost {ETH}'
                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
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
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
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
                            onChange={(e) => setImageURL(e.target.value)}
                            value={imageURL}
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
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
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