// import React from 'react'
// import Menu from '../components/Project/Menu'
import Arrowleft from '/svg/arrow-left.svg'
import { Link } from "react-router-dom"

const Project = () => {
  return (
    <div className='h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1'>
        <div className="absolute top-6 left-8">
            <Link className="Second text-[36px] flex gap-5" to="/"><img src={Arrowleft} alt="" />Home</Link>
        </div>
        <div className='w-[92%] h-[90%] bg-primary rounded-[52px] p-[48px]'>
            <h1 className='Second text-[44px]'>Create New Project</h1>
            <div>
                <form action="">
                    <input type="text" />
                    <input type="text" />
                </form>
            </div>
            <hr className='border-2 border-secondary' />
            <div>
                {/* Mapping Show Project Names */}
                <button>
                    Chinjuku Sudlhor
                </button>
            </div>
        </div>
    </div>
  )
}

export default Project