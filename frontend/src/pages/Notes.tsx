import { Link } from "react-router-dom";
import Arrowleft from "/svg/arrow-left.svg";
import Menu from "../components/Notes/Menu";
import { Toaster } from "@/components/ui/toaster";
import StickyNotes from "@/components/Notes/StickyNotes";
import { useState } from "react";
import { UserContextProvider } from "@/contexts/api-get/UserContext";
import Calendar from "@/components/Notes/Calendar";
import { ListContextProvider } from "@/contexts/api-get/ListContext";

const Notes = () => {
  const [openSwitch, setOpenSwitch] = useState(true);

  return (
    <UserContextProvider>
      <ListContextProvider>
        <div className="h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1">
          <Toaster />
          <div className="absolute top-6 left-8">
            <Link className="Second text-[36px] flex gap-5" to="/">
              <img src={Arrowleft} alt="" />
              Home
            </Link>
          </div>
          <div className="w-[92%] h-[90%] bg-primary rounded-[52px] p-[26px] flex relative">
            <div className="absolute top-[-33px] w-[245px] h-[66px] right-[90px] flex justify-center items-center bg-secondary1 text-primary text-[32px] font-bold">
              Notes
            </div>
            <Menu
              handleSwitch={(bools) => setOpenSwitch(bools)}
              openSwitch={openSwitch}
            />
            {openSwitch ? <StickyNotes /> : <Calendar />}
          </div>
        </div>
      </ListContextProvider>
    </UserContextProvider>
  );
};

export default Notes;
