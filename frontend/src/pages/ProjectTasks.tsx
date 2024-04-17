import { Link, useParams } from "react-router-dom"
import Arrowleft from '/svg/arrow-left.svg'
import Menu from '../components/Project/Menu'
import { Tasks } from "@/components/Project/Tasks"
import { Toaster } from "@/components/ui/toaster"
import { showProjectName } from "@/api/get/Project/getProjectName"
import { useEffect, useState } from "react"

const ProjectTasks = () => {
  const { projectId } = useParams();
  const boardname = "Frontend"
  const [projectName, setProjectName] = useState("");
  console.log('Project ID:', projectId);
  useEffect(() => {
    const fetchData = async () => {
      const fetchProjectData = await showProjectName(projectId)
      setProjectName(fetchProjectData.projectname);
    }
    fetchData();
  })
  return (
    <div className='h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1'>
        <Toaster />
        <div className="absolute top-6 left-8">
            <Link className="Second text-[36px] flex gap-5" to="/project"><img src={Arrowleft} alt="" />Back</Link>
        </div>
        <div className='w-[92%] h-[90%] bg-primary rounded-[52px] p-[26px] flex relative'>
        <div className="absolute top-[-33px] w-[245px] h-[66px] right-[90px] flex justify-center items-center bg-secondary1 text-primary text-[32px] font-bold">
          Project Task
        </div>
            <Menu projectname={projectName} />
            <div className="flex flex-col justify-center w-[85%] overflow-x-auto overflow-y-hidden px-5">
              <h1 className="Second text-[39px] pt-5 px-6">
              {boardname} 
              <button className="mx-5">
                star
              </button>
              </h1>
              <Tasks />
            </div>
        </div>
    </div>
  )
}

export default ProjectTasks