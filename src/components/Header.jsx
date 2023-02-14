import React from 'react'
import {GrBusinessService} from "react-icons/gr"
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount")
  return (
    <header className='flex justify-between items-center bg-amber-100 
    p-5 shadow-lg fixed left-0 right-0'
    >
        <Link to='/' className='flex text-black space-x-1 justify-center
        items-center'> 
        <span>Crow</span>
        <GrBusinessService/>
        </Link>

        <div className='flex space-x-2 justify-center'>
          {connectedAccount ? (
             <button
                type='button'
                className='inline-block bg-lime-500 px-5 py-2 text-white
                font-medium text-xs leading-tight uppercase rounded-full 
                shadow-md hover:bg-lime-600'
                > 
                {truncate(connectedAccount, 4,4,11) }</button>
                ) :
             ( <button type='button'
             className='inline-block bg-lime-500 px-5 py-2 text-white
             font-medium text-xs leading-tight uppercase rounded-full 
             shadow-md hover:bg-lime-600'
             onClick={connectWallet}
             > Connect Wallet
             </button>)}
           
        </div>
        
        </header>
  )
}

export default Header