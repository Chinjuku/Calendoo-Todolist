// import { Link } from "react-router-dom"
import logoButtom from '/svg/arrow-bottom.svg'
import { useEffect, useContext } from 'react';
import { Link, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import { UserContext } from "@/components/contexts/user/UserContext"

const Navbar = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    scrollSpy.update();
    return () => {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    };
  }, []);
  const handleSetActive = (to: unknown) => {
    // setActiveSection(to);
    console.log(to)
  };
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
//   const activeLinkStyles = {
//     borderBottom: "3px solid blue", // Change to your desired underline color
//   };
  return (
    <div className='laptop:h-[90px] w-full bg-secondary px-[67px] fixed z-[100] flex items-center justify-between'>
        <div className='text-[32px] font-extrabold text-primary'>
            <a className='cursor-pointer' onClick={scrollToTop}>Calendoo</a>
        </div>
        <div className='flex'>
            <ul className="flex text-primary items-center text-[24px] font-bold gap-[52px]">
                <li className='cursor-pointer focus:border-b-primary focus:border-b'>
                    <Link 
                    activeClass="active" 
                    to="home" 
                    spy={true} 
                    smooth={true} 
                    offset={10} 
                    duration={500} 
                    onSetActive={handleSetActive}
                    // style={activeSection === "home" ? activeLinkStyles : {}}
                    >
                        Home
                    </Link>
                </li>
                <li className='cursor-pointer focus:border-b-primary focus:border-b'>
                    <Link 
                    activeClass="active" 
                    to="about" 
                    spy={true} 
                    smooth={true} 
                    offset={-120} 
                    duration={500} 
                    onSetActive={handleSetActive}
                    // style={activeSection === "about" ? activeLinkStyles : {}}
                    >
                        About
                    </Link>
                </li>
                <li className='cursor-pointer focus:border-b-primary focus:border-b'>
                    <Link 
                    activeClass="active" 
                    to="contacts"
                    spy={true} 
                    smooth={true} 
                    offset={10} 
                    duration={500} 
                    onSetActive={handleSetActive}
                    // style={activeSection === "contacts" ? activeLinkStyles : {}}
                    >
                        Contact
                    </Link>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="btn border-none text-primary text-[24px] bg-transparent mx-[-15px]">Project <img src={logoButtom} alt="" /></summary>
                        <ul className="p-2 shadow menu text-secondary bg-primary dropdown-content z-[1] rounded-box w-52">
                            <li><a href="/notes">Notes</a></li>
                            <li><a href="/project">Project Tasks</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <div className="h-[61px] w-[61px] rounded-[50%] bg-primary"></div>
                </li>
                <li>
                    <p className='text-primary text-xl'>{userContext.user?.username}</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar