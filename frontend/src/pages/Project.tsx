// import React from 'react'
import Arrowleft from '/svg/arrow-left.svg'
import { Link } from "react-router-dom"

const Project = () => {
  return (
    <div className='h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1'>
        <div className="absolute top-6 left-8">
            <Link className="Second text-[36px] flex gap-5" to="/"><img src={Arrowleft} alt="" />Home</Link>
        </div>
        <div className='w-[92%] h-[90%] bg-primary rounded-[52px]'>
            
        </div>
    </div>
  )
}

export default Project