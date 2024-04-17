import All from "/svg/All.svg"
import Today from "/svg/Today.svg"
import Calendars from "/svg/Calendar.svg"
import Stickywall from "/svg/Stickywall.svg"
import Add from "/svg/Add.svg"
// import Time from "/svg/Time.svg"
import { useState } from "react";
import AddBoard from "./AddBoard"
import "react-datepicker/dist/react-datepicker.css";

interface ProjectNameProps {
    projectname: string;
}

const Menu = (props: ProjectNameProps) => {
  const [openBoard, setOpenBoard] = useState(false);
  return (
    <div className="h-full w-[22%] bg-hover rounded-[26px] p-[22px] text-secondary">
        <h1 className="Second text-[44px] text-center">{props.projectname}</h1>
        <div>
            <p className="Second text-[20px]">Tasks</p>
            <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
                <div className="flex gap-[25px] w-[60%]">
                    <img height={22} width={22} src={All} alt="" />
                    <p className="text-secondary">All Boards</p>  
                </div>
                <p className="bg-hover1 px-2 py-1 rounded-[3px]">{20}</p>
            </div>
            <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
                <div className="flex gap-[25px] w-[35%]">
                    <img height={23} width={23} src={Today} alt="" />
                    <p className="text-secondary">Member</p>  
                </div>
                <p className="bg-hover1 px-2 py-1 rounded-[3px]">{55}</p>
            </div>
            <button className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
                <img height={27} width={27} src={Stickywall} alt="" />
                <p className="text-secondary">Boards</p>  
            </button>
            <button className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[20px] my-2 flex items-center">
                <img height={22} width={22} src={Calendars} alt="" />
                <p className="text-secondary">Calendar</p>  
            </button>
        </div>
        <hr className="border border-secondary mx-[15px] my-[20px]" />
        <div>
            <div className="flex justify-between px-[15px] mb-2">
                <p className="Second text-[20px]">Boards</p>
                {/* Add Boards */}
                <button onClick={() => setOpenBoard(true)} className="hover:opacity-60 transition-all">
                    <img height={20} width={20} src={Add} alt="" />
                </button>
                {openBoard ? <AddBoard handleSetup={ (bools) => setOpenBoard(bools) } /> : ""}
            </div>
            <div className="h-[120px] overflow-y-auto">
                {/* Mapping Data Here */}
                <button className="text-[16px] h-[35px] w-full px-[20px] my-2 flex gap-4 items-center">
                    <div className="h-[26px] w-[28px] bg-black"></div>
                    <p className="text-secondary">Frontend</p>  
                </button>
            </div>
        </div>
    </div>
  )
}

export default Menu