import All from "/svg/All.svg";
import Today from "/svg/Today.svg";
import Calendars from "/svg/Calendar.svg";
import Stickywall from "/svg/Stickywall.svg";
import Add from "/svg/Add.svg";
// import Time from "/svg/Time.svg"
import { useEffect, useState } from "react";
import AddBoard from "./Board/AddBoard";
import "react-datepicker/dist/react-datepicker.css";
import { showBoards } from "@/api/get/Board/getBoard";
import { useParams } from "react-router-dom";
import { countBoards, countTasksInBoard } from "@/api/get/Board/countBoards";
import { useQuery } from "@tanstack/react-query";
import { countTasks } from "@/api/get/Task/countTasks";
import { LoadData } from "../LoadData";
import { RiDeleteBackFill } from "react-icons/ri";
import "@/css/projectmenu.css"
import { Modal } from "flowbite-react";
import { DeleteBoard } from "./Board/DeleteBoard";

interface ProjectNameProps {
  projectname: string;
  showBoard: (id: string, name: string, isStarred: boolean) => void;
  id: string;
  handleSwitch: (bools: boolean) => void
  openSwitch: boolean
}
interface BoardData {
  boardname: string;
  color: string;
  id: string;
  isStarred: boolean;
  projectId: string;
}
interface TaskCountinBoard {
  id : string;
  count: number;
}

const Menu = (props: ProjectNameProps) => {
  const { projectId } = useParams();
  const [board, setBoard] = useState<BoardData[]>([]);
  const [boardCount, setBoardCount] = useState<number>(0);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [openBoard, setOpenBoard] = useState(false);
  const [taskCountBoard, setTaskCountBoard] = useState<TaskCountinBoard[]>([])
  const [openDelete, setOpenDelete] = useState(false);
  const pId = projectId ?? "";
  const { data: countTask, isLoading: countTaskLoad } = useQuery({
    queryKey: ["countTask", pId],
    queryFn: async () => {
      const result = await countTasks(pId);
      return result;
    },
    enabled: !!pId,
  });
  const { data: countBoard, isLoading: countBoardLoad } = useQuery({
    queryKey: ["countBoard", pId],
    queryFn: async () => {
      const result = await countBoards(pId);
      return result;
    },
    enabled: !!pId,
  });
  const { data: allBoard, isLoading: allBoardLoad } = useQuery({
    queryKey: ["allBoard", pId],
    queryFn: async () => {
      const result = await showBoards(pId);
      return result;
    },
    enabled: !!pId,
  });
  const { data: countTasksfromBoard, isLoading: countTasksfromBoardLoad } = useQuery({
    queryKey: ["countTasksfromBoard", pId],
    queryFn: async () => {
      const result = await countTasksInBoard(pId);
      return result.map((task: { id: string; _count: { task: number; }; }) => {
        return ({
          id: task.id,
          count: task._count.task
        })});
    },
    enabled: !!pId,
  });

  useEffect(() => {
    if (countTask) {
      setTaskCount(countTask);
    }
    if (countBoard) {
      setBoardCount(countBoard);
    }
    if (allBoard) {
      setBoard(allBoard);
    }
    if (countTasksfromBoard) {
      setTaskCountBoard(countTasksfromBoard);
    }
  }, [countTask, countBoard, allBoard, countTasksfromBoard]);
  function handleOpen(id: string, boardname: string, isStarred: boolean) {
    props.showBoard(id, boardname, isStarred)
    props.handleSwitch(false);
  }

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
          <p className="bg-hover1 px-2 py-1 rounded-[3px]">
            {countBoardLoad ? <LoadData /> : boardCount}
          </p>
        </div>
        <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
          <div className="flex gap-[25px] w-[35%]">
            <img height={23} width={23} src={Today} alt="" />
            <p className="text-secondary">Tasks</p>
          </div>
          <p className="bg-hover1 px-2 py-1 rounded-[3px]">
            {countTaskLoad ? <LoadData /> : taskCount}
          </p>
        </div>
        <button
          onClick={() => props.handleSwitch(false)}
          className={`switch ${
            !props.openSwitch ? "active" : null
          } hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center`}
        >
          <img height={27} width={27} src={Stickywall} alt="" />
          <p className="text-secondary">Board</p>
        </button>
        <button
          onClick={() => props.handleSwitch(true)}
          className={`switch ${
            props.openSwitch ? "active" : null
          } hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[20px] my-2 flex items-center`}
        >
          <img height={22} width={22} src={Calendars} alt="" />
          <p className="text-secondary">Calendar</p>
        </button>
      </div>
      <hr className="border border-secondary mx-[15px] my-[20px]" />
      <div>
        <div className="flex justify-between px-[15px] mb-2">
          <p className="Second text-[20px]">Boards</p>
          {/* Add Boards */}
          <button
            onClick={() => setOpenBoard(true)}
            className="hover:opacity-60 transition-all"
          >
            <img height={20} width={20} src={Add} alt="" />
          </button>
          {openBoard ? (
            <AddBoard handleSetup={(bools) => setOpenBoard(bools)} />
          ) : (
            ""
          )}
        </div>
        <div className="h-[180px] overflow-y-auto">
          {allBoardLoad || countTasksfromBoardLoad ? (
            <LoadData />
          ) : (
            board &&
            board.map((data) => (
              <div key={data.id}>
                  <button
                      key={data.id}
                      onClick={() => handleOpen(data.id, data.boardname, data.isStarred)}
                      className="relative text-[16px] h-[35px] w-full px-[20px] my-2 flex gap-4 items-center rounded-lg"
                      style={{
                          background: props.id === data.id ? "#E0D8ED" : "",
                          transition: "500ms",
                      }}
                  >
                      <div
                          className="h-[25px] w-[26px]"
                          style={{ background: `${data.color}` }}
                      ></div>
                      <p className="text-secondary">{data.boardname}</p>
                      {/* Conditionally render a button based on the count of tasks */}
                      {taskCountBoard.find((item) => item.id === data.id)?.count === 0 && (
                        <>
                          <button onClick={() => setOpenDelete(true)} className="absolute z-20 right-2">
                            <RiDeleteBackFill />
                          </button>
                          <Modal
                              show={openDelete} size={"3xl"} onClose={() => setOpenDelete(false)}
                          >
                            <Modal.Body>
                              <DeleteBoard
                                id={data.id}
                                setOpenDelete={(bools) => setOpenDelete(bools)}
                              />
                            </Modal.Body>
                          </Modal>
                        </>
                      )}
                  </button>
                  
              </div>
          ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
