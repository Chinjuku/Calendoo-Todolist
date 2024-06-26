"use client";

import Calendars from "/svg/Calendar.svg";
import Stickywall from "/svg/Stickywall.svg";
import Add from "/svg/Add.svg";
import Time from "/svg/Time.svg";
import { useState } from "react";
import AddNote from "./AddNote";
import "react-datepicker/dist/react-datepicker.css";
import { monthNames } from "@/composables/initial-data";
import { CheckOpenNotes } from "@/composables/React.types";
import { Modal } from "flowbite-react";
import "@/css/notemenu.css";
import { CountNotes } from "./CountNotes";
import { AllLists } from "./List/AllLists";

const Menu = (props: CheckOpenNotes) => {
  const [openModal, setOpenModal] = useState(false);

  const monthIndex: number = new Date().getMonth();
  const days: number = new Date().getDate();
  const year: number = new Date().getFullYear();
  const monthName: string = monthNames[monthIndex];

  return (
    <div className="h-full w-[27%] bg-hover rounded-[26px] p-[22px] text-secondary">
      <div className="flex justify-between mb-[20px]">
        <h1 className="Second text-[32px]">Menu</h1>
        <h1 className="Second text-[29px]">
          {days} {monthName} {year}
        </h1>
      </div>
      <div>
        {props.openSwitch && (
          <>
            <div>
              <p className="Second text-[20px] mb-5">Filter</p>
              <div className="text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
                <img height={40} width={40} src={Time} alt="" />
              </div>
            </div>
            <hr className="border border-secondary mx-[15px] my-[20px]" />
          </>
        )}
        <CountNotes />
        <button
          onClick={() => props.handleSwitch(false)}
          className={`switch ${
            !props.openSwitch ? "active" : null
          } hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[20px] my-2 flex items-center`}
        >
          <img height={22} width={22} src={Calendars} alt="" />
          <p className="text-secondary">Calendar</p>
        </button>
        <button
          onClick={() => props.handleSwitch(true)}
          className={`switch ${
            props.openSwitch ? "active" : null
          } hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center`}
        >
          <img height={27} width={27} src={Stickywall} alt="" />
          <p className="text-secondary">Sticky Wall (Day)</p>
        </button>
        <button
          onClick={() => setOpenModal(true)}
          className="hover:bg-hover1 focus:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center"
        >
          <img height={26} width={26} src={Add} alt="" />
          <p className="text-secondary">Add Note</p>
        </button>
        <Modal
          show={openModal}
          size={"6xl"}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Body className="bg-primary rounded-xl">
            <AddNote
              checkClose={(booleanValue) => {
                setOpenModal(booleanValue);
              }}
            />
          </Modal.Body>
        </Modal>
      </div>
      <hr className="border border-secondary mx-[15px] my-[20px]" />
      <AllLists />
    </div>
  );
};

export default Menu;
