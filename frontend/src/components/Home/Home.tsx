import bghome from '/svg/bg-home.svg'
import homeimg from '/image/homeimg.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="h-screen w-full relative flex justify-center">
        <img className='absolute laptop:top-[180px]' src={bghome} alt="" />
        <h1 className='absolute laptop:top-[234px] laptop:text-[74px] font-bold text-secondary'>Calendoo To Do List</h1>
        <p className='absolute laptop:w-[662px] text-[30px] laptop:top-[371px] font-bold text-center'>
            "Empower your productivity with the ultimate to-do list: your roadmap to success, one task at a time."
        </p>
        <div className='w-[591px] h-[73px] flex justify-between absolute laptop:top-[575px]'>
            <Link to="/notes" className='rounded-[50px] h-full w-[220px] text-opacity-70 bg-transparent border-secondary border-[4px] justify-center text-[24px] font-bold text-secondary hover:bg-secondary transition-all hover:text-primary flex items-center'>Notes</Link>
            <Link to="/project" className='rounded-[50px] h-full w-[220px] bg-secondary border-secondary border-[4px] justify-center text-[24px] font-bold text-primary hover:text-secondary hover:bg-transparent transition-all flex items-center'>Project Tasks</Link>
        </div>
        <div className='w-full h-[239px] absolute bottom-0'>
            <img className='w-full' src={homeimg} alt="" />
        </div>
    </div>
  )
}

export default Home