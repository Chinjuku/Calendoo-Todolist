import { Link } from "react-router-dom"
import Arrowleft from '/svg/arrow-left.svg'
import Menu from '../components/Notes/Menu'
import { Toaster } from "@/components/ui/toaster"

const Notes = () => {
  return (
    <div className='h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1'>
        <Toaster />
        <div className="absolute top-6 left-8">
            <Link className="Second text-[36px] flex gap-5" to="/"><img src={Arrowleft} alt="" />Home</Link>
        </div>
        <div className='w-[92%] h-[90%] bg-primary rounded-[52px] p-[26px]'>
            <Menu />
        </div>
    </div>
  )
}

export default Notes