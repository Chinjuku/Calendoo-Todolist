import { Link, useParams } from "react-router-dom";
import Arrowleft from "/svg/arrow-left.svg";
import Menu from "../components/Project/Menu";
import { Tasks } from "@/components/Project/Task/Tasks";
import { Toaster } from "@/components/ui/toaster";
import { showProjectName } from "@/api/get/Project/getProjectName";
import { useEffect, useState } from "react";
import "@/css/projecttask.css";
import { IoStar } from "react-icons/io5";
import { showFirstBoard } from "@/api/get/Board/getFirstBoard";
import { updateStar } from "@/api/post/Board/updateStar";
import { ProjectCalendar } from "@/components";

const ProjectTasks = () => {
  const [openSwitch, setOpenSwitch] = useState(false);
  const { projectId } = useParams();
  const [board, setBoard] = useState({
    boardId: "",
    boardname: "",
    isStarred: false,
  });
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const fetchProjectData = await showProjectName(projectId);
      setProjectName(fetchProjectData.projectname);
    };
    fetchData();
  });
  if (
    board.boardname === "" &&
    board.boardId === "" &&
    board.isStarred === false
  ) {
    const fetchData = async () => {
      const data = await showFirstBoard(projectId);
      setBoard({
        boardId: data.id,
        boardname: data.boardname,
        isStarred: data.isStarred,
      });
    };
    fetchData();
  }
  const handleStar = async () => {
    const setStar = await updateStar(board.isStarred, board.boardId, projectId);
    setBoard({
      boardId: board.boardId,
      boardname: board.boardname,
      isStarred: setStar.isStarred,
    });
  };
  return (
    <div className="h-screen overflow-x-hidden overflow-y-hidden w-full relative flex justify-center items-center pt-[4%] bg-primary1">
      <Toaster />
      <div className="absolute top-6 left-8">
        <Link className="Second text-[36px] flex gap-5" to="/project">
          <img src={Arrowleft} alt="" />
          Back
        </Link>
      </div>
      <div className="w-[92%] h-[90%] bg-primary rounded-[52px] p-[26px] flex relative">
        <div className="absolute top-[-33px] w-[245px] h-[66px] right-[90px] flex justify-center items-center bg-secondary1 text-primary text-[32px] font-bold">
          Project Task
        </div>
        <Menu
          handleSwitch={(bools) => setOpenSwitch(bools)}
          openSwitch={openSwitch}
          projectname={projectName}
          showBoard={(id, name, isStarred) =>
            setBoard({ boardId: id, boardname: name, isStarred: isStarred })
          }
          id={board.boardId}
        />
        {openSwitch ? <ProjectCalendar /> : (
          <div className="flex flex-col justify-center w-[85%] overflow-x-auto overflow-y-hidden px-5">
            {(board.boardname === "" &&
              board.boardId === "" &&
              board.isStarred === false) ||
            (board.boardname === undefined &&
              board.boardId === undefined &&
              board.isStarred === undefined) ? (
              <div className="Second text-4xl flex justify-center">
                Add (+) in Board to Start Kanban Project
              </div>
            ) : (
              <>
                <h1 className="flex Second text-[39px] pt-5 px-6">
                  <p className="w-1/4">{board.boardname}</p>
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={board.isStarred}
                      onChange={handleStar}
                    />
                    <IoStar className="stroke-1 stroke-black" />
                  </label>
                </h1>
                <Tasks id={board.boardId} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
