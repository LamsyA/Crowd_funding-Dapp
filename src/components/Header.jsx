import React from 'react'
import {GrBusinessService} from "react-icons/gr"

const Header = () => {
  return (
    <header className='flex justify-between items-center bg-amber-100 
    p-5 shadow-lg fixed left-0 right-0'
    >
        <a href='#' className='flex text-black space-x-1 justify-center
        items-center'> 
        <span>Header</span>
        <GrBusinessService/>
        </a>

        <div className='flex space-x-2 justify-center'>
            <button type='button'
            className='inline-block bg-lime-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-lime-600'> Connect Wallet</button>
        </div>
        
        </header>
  )
}

export default Header