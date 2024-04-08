"use client"
import { useState } from "react";
import { Pagination } from "flowbite-react"

const Calendar = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className="py-[15px] px-[30px] w-[71%]">  
      <div className="flex justify-between">
        <h1 className="Second text-[40px]">Calendar</h1>
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
    </div>
  )
}

export default Calendar