import Arc from '/svg/Arc.svg'
import AboutUs from '/svg/ABOUT-US.svg'

const About = () => {
  return (
    <div className='h-[705px] flex items-center relative'>
        <img className='absolute laptop:left-0' src={Arc} alt="" />
        <img className='absolute laptop:left-[33px]' src={AboutUs} alt="" />
        <div className='absolute laptop:left-[18%] grid grid-cols-2 p-[5%] gap-[5%] bg-primary text-[17px] font-extrabold text-secondary w-[75%] h-[367px] rounded-[180px]'>
            <div>
                Embark on a journey of productivity and 
                organization with our meticulously crafted
                to-do list. Designed to streamline your tasks 
                and prioritize your goals, our to-do list is 
                your steadfast companion in navigating life's 
                challenges. Whether it's conquering daily 
                errands, with confidence.
            </div>
            <div>
                Embark on a journey of productivity and 
                organization with our meticulously crafted
                to-do list. Designed to streamline your tasks 
                and prioritize your goals, our to-do list is 
                your steadfast companion in navigating life's 
                challenges. Whether it's conquering daily 
                errands, with confidence.
            </div>
        </div>
    </div>
  )
}

export default About