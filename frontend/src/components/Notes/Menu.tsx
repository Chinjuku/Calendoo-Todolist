import All from "/svg/All.svg"
import Today from "/svg/Today.svg"
import Calendars from "/svg/Calendar.svg"
import Stickywall from "/svg/Stickywall.svg"
import Add from "/svg/Add.svg"
import Time from "/svg/Time.svg"
import { useState } from "react";
import DatePicker from "react-datepicker";
import AddNote from "./AddNote"
import AddList from "./AddList"
import "react-datepicker/dist/react-datepicker.css";
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
import { Setup, Setup2 } from "@/composables/React.types"

const Menu = () => { 
  const monthIndex: number = (new Date().getMonth());
  const day: number = (new Date().getDay());
  const year: number = (new Date().getFullYear());
//   const time = new Date().toLocaleTimeString();
  const monthName: string = monthNames[monthIndex];
  const [startDate, setStartDate] = useState(new Date());
  const handleDateSelect = (date : Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    console.log(formattedDate);
  }
  const [openNote, setopenNote] = useState<Setup>({check: false});
  const [openList, setopenList] = useState<Setup2>({check: false});
  const addColor = "secondary"
  return (
    <div className="h-full w-[27%] bg-hover rounded-[26px] p-[22px] text-secondary">
        <div className="flex justify-between mb-[35px]">
            <h1 className="Second text-[32px]">Menu</h1>
            <h1 className="Second text-[29px]">{day} {monthName} {year}</h1>
        </div>
        <div>
            <p className="Second text-[20px]">Notes</p>
            <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
                <div className="flex gap-[25px] w-[35%]">
                    <img height={22} width={22} src={All} alt="" />
                    <p className="text-secondary">All Notes</p>  
                </div>
                <p className="bg-hover1 px-2 py-1 rounded-[3px]">{20}</p>
            </div>
            <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
                <div className="flex gap-[25px] w-[35%]">
                    <img height={23} width={23} src={Today} alt="" />
                    <p className="text-secondary">Today</p>  
                </div>
                <p className="bg-hover1 px-2 py-1 rounded-[3px]">{55}</p>
            </div>
            <button className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[20px] my-2 flex items-center">
                <img height={22} width={22} src={Calendars} alt="" />
                <p className="text-secondary">Calendar</p>  
            </button>
            <button className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
                <img height={27} width={27} src={Stickywall} alt="" />
                <p className="text-secondary">Sticky Wall (Day)</p>  
            </button>
            <button onClick={() => setopenNote({check: true})} className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
                <img height={26} width={26} src={Add} alt="" />
                <p className="text-secondary">Add Note</p>  
            </button>
            {openNote.check == true ? <AddNote /> : null}
        </div>
        <hr className="border border-secondary mx-[15px] my-[20px]" />
        <div>
            <p className="Second text-[20px]">Lists</p>
            {/* Mapping Data Here */}
            <div className="h-[120px] overflow-y-scroll">
                <div className="text-[16px] h-[35px] w-full px-[15px] my-2 flex justify-between items-center">
                    <div className="flex gap-[20px] w-[60%]">
                        <div className={`h-[26px] w-[28px] bg-${addColor}`}></div>
                        <p className="text-secondary">Personal</p>  
                    </div>
                    <p className="bg-hover1 px-2 py-1 rounded-[3px]">{20}</p>
                </div>
                
            </div>
            <button onClick={() => setopenList((prevOpenNote) => ({ ...prevOpenNote, check: true}))} className="hover:bg-hover1 mt-[15px] rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
                <img height={26} width={26} src={Add} alt="" />
                <p className="text-secondary">Add More List</p>  
            </button>
            {openList.check == true ? <AddList handleClick={(bools) => {
                setopenList({check: bools})
            }} /> : null}
        </div>
        <hr className="border border-secondary mx-[15px] my-[20px]" />
        <div>
            <p className="Second text-[20px]">Filter</p>
            <div className="text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
                <img height={40} width={40} src={Time} alt="" />
                <DatePicker 
                    className="py-[10px] px-[15px] text-secondary font-bold rounded-[10px]"
                    selected={startDate} 
                    onSelect={handleDateSelect}
                    onChange={(date: Date | null) => date && setStartDate(date)} 
                />
            </div>
        </div>
    </div>
  )
}

export default Menu