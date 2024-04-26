// import "@fontsource/anek-telugu";
import { useCallback, useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";
import { TiPlus } from "react-icons/ti";

import { Column } from "@/components/Project";
import { BoardProps, IElement } from "@/composables/React.types";
import { AddTask } from "@/components/Project/Task/AddTask";
import { showTasks } from "@/api/get/Task/getTasks";
import { showTaskLists } from "@/api/get/TaskList/getTaskLists";
import { moveTaskList } from "@/api/post/TaskList/updateTaskList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadData } from "../../LoadData";

export const DEFAULT_COLUMN = "backlog";
interface TaskData {
  taskname: string;
  taskId: string;
}

export const Tasks = (props: BoardProps) => {
  const [columns, setColumn] = useState<TaskData[]>([]);
  const [data, setData] = useState<IElement[]>([]);
  const  queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (data: { elementId: string; overId?: string | undefined }) => {
      const { elementId, overId } = data;
      await moveTaskList(elementId, overId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"] })
    },
    onError: () => {
        console.log("error")
    },
  })
  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const elementId = active.id;
      const deepCopy = [...data];
      const updatedState = deepCopy.map((elm): IElement => {
        if (elm.id === elementId) {
          if (over && over.id === elm.taskId) {
            return elm;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mutate({ elementId, overId: over?.id });
        }
        return elm;
      });
      setData(updatedState);
    },
    [data, setData, mutate]
  );

  const { data: tasks, isLoading: taskLoad } = useQuery({
    queryKey: ["tasks", props.id],
    queryFn: async () => await showTasks(props.id),
    enabled: !!props.id
  });
  const { data: taskLists, isLoading: tasklistLoad } = useQuery({
    queryKey: ["taskLists", props.id],
    queryFn: async () => await showTaskLists(props.id),
    enabled: !!props.id,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = tasks.map((task: { id: string; taskname: string }) => {
          return {
            taskId: task.id,
            taskname: task.taskname,
          };
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tasklist = taskLists.map((tasklist: any) => {
          return {
            id: tasklist.id,
            taskId: tasklist.taskId,
            taskname: tasklist.task.taskname,
            title: tasklist.title,
            description: tasklist.description,
            craeteAt: tasklist.craeteAt,
            piority: tasklist.piority,
            setdate: tasklist.setdate
          };
        });
        setColumn(task);
        setData(tasklist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tasks, taskLists]);
  return (
    <DndContext onDragEnd={handleOnDragEnd}>
      { taskLoad || tasklistLoad ? <LoadData /> :
        <MainWrapper>
        {columns &&
          columns.map((column, columnIndex) => (
            <Column
              key={`column-${columnIndex}`}
              id={column.taskId}
              heading={column.taskname}
              elements={_.select(
                data,
                (elm) => elm,
                (f) => f.taskId === _.camal(column.taskId)
              )}
            />
          ))}
        <div
          style={{ width: "295px" }}
          className="dropdown h-[100px] border-dashed border-2 flex items-center justify-center border-black border-opacity-65 p-[10px] rounded-[10px]"
        >
          <button
            tabIndex={0}
            className="w-[295px] gap-3 text-center rounded-xl flex bg-primary1 items-center h-full justify-center font-bold text-[32px]  text-secondary"
          >
            <p className="mt-3">Add Task </p>{" "}
            <TiPlus className="text-secondary" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content bg-primary1 z-[1] max-h-[500px] mt-[330px] border border-secondary menu p-2 shadow rounded-box w-64"
          >
            <AddTask id={props.id} />
          </ul>
        </div>
      </MainWrapper>
      }
    </DndContext>
  );
};

const MainWrapper = styled("div", {
  display: "flex",
  backgroundColor: "#F4EEFF",
  padding: "40px 10px",
  // fontFamily: "Anek Telugu",
  height: "78vh",
  gap: "30px",
  overflowX: "scroll",
});