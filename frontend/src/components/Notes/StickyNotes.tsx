"use client";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import Bin from "/public/svg/bin.svg"

const StickyNotes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const color = "#6100FF"
  return (
    <div className="py-[15px] px-[30px] w-[71%]">  
      <div className="flex justify-between">
        <h1 className="Second text-[40px]">Sticky Wall</h1>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={1000}
            onPageChange={onPageChange}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div>
      </div>
      <div className="grid grid-cols-3 p-3 gap-4 h-[95%] overflow-auto">
        {/* Mapping Query Data per day */}
        <div className="rounded-[12px] w-full h-[207px] relative p-4" style={{ backgroundColor: `${color}` }}>
            <h1 className="text-[28px]">Title :</h1>
            <p>Description</p>
            <img className="absolute bottom-2 right-2" src={Bin} alt="" />
        </div>
      </div>
    </div>
  );
};

export default StickyNotes;
