import { setGlobalState, useGlobalState } from "../store"


const Hero = () => {
  const [stats] = useGlobalState("stats")
  return (
    <div className="text-center bg-amber-50 text-gray-800 py-24 px-5">
    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold 
    tracking-tight mb-12">
      <span className="capitalize"> Bring creative projects to life on </span>
      <br />
      <span className="uppercase text-lime-600">Crow.</span>
    </h1>
   <div className="flex justify-center items-center space-x-2">
   <button type='button'
            className='inline-block bg-lime-500 px-5 py-2 text-white
            font-medium text-xs leading-tight uppercase rounded-full 
            shadow-md hover:bg-lime-600'
            onClick={()=> setGlobalState("createModal","scale-100")}
            > 
             Add Project
    </button>

    <button type='button'
            className='inline-block border border-lime-500 px-5 py-2
             text-lime-600 bg-transparent font-medium text-xs
             leading-tight uppercase rounded-full hover:text-white
            shadow-md  hover:bg-lime-600'>
               Back Projects
    </button>
   </div>
   <div className="flex justify-center items-center mt-10">
    <div className="flex flex-col justify-center items-center
     h-20 border shadow-md w-full">
      <span className="text-lg font-bold text-lime-900 
      leading-5 ">{stats?.totalProjects || 0} </span>
      <span >Projects</span>
    </div>
    <div className="flex flex-col justify-center items-center
     h-20 border shadow-md w-full">
      <span className="text-lg font-bold text-lime-900 
      leading-5 ">{stats?.totalBacking || 0} </span>
      <span >Backings</span>
    </div>
    <div className="flex flex-col justify-center items-center
     h-20 border shadow-md w-full">
      <span className="text-lg font-bold text-lime-900 
      leading-5 ">{stats?.totalDonations|| 0}ETH </span>
      <span >Donated</span>
    </div>
   </div>
    </div>
  )
}

export default Hero