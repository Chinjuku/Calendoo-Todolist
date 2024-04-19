import "@fontsource/anek-telugu";
import { useCallback, useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";
import { TiPlus } from "react-icons/ti";

import { Column } from "@/components/Project";
import { BoardProps, IElement } from "@/composables/React.types"
import { AddTask } from "@/components/Project/AddTask";
import { showTasks } from "@/api/get/Task/getTasks";

// const COLUMNS = ["Backlog", "In Progress", "", ""];
export const DEFAULT_COLUMN = "Frontend";

const DEFAULT_DATA_STATE: IElement[] = [
  {
    id: _.uid(6),
    content: "Hello world 1",
    column: DEFAULT_COLUMN,
  },
  {
    id: _.uid(6),
    content: "Hello world 2",
    column: DEFAULT_COLUMN,
  },
];
interface TaskData {
  taskname : string
}

export const Tasks = (props: BoardProps) => {
  const [task, setTask] = useState<TaskData[] | null>(null)
  const [data, setData] = useState<IElement[]>(DEFAULT_DATA_STATE);
  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const elementId = active.id;
      const deepCopy = [...data];

      const updatedState = deepCopy.map((elm): IElement => {
        if (elm.id === elementId) {
          const column = over?.id ? String(over.id) : elm.column;
          return { ...elm, column };
        }
        return elm;
      });

      setData(updatedState);
    },
    [data, setData]
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await showTasks(props.id);
      setTask(response)
    }
    fetchData();
  }, [props.id])
  const COLUMNS = task?.map((task: { taskname: string; }) => { return task.taskname })
  console.log(COLUMNS)

  return (
    <DndContext onDragEnd={handleOnDragEnd}>
      <MainWrapper>
        {COLUMNS && COLUMNS.map((column, columnIndex) => (
          <Column
            key={`column-${columnIndex}`}
            heading={column}
            elements={_.select(
              data,
              (elm) => elm,
              (f) => f.column === _.camal(column)
            )}
          />
        ))}
        <div style={{ width: '295px' }} className="dropdown h-[100px] border-dashed border-2 flex items-center justify-center border-black border-opacity-65 p-[10px] rounded-[10px]">
          <button tabIndex={0} className="w-[295px] gap-3 text-center rounded-xl flex bg-primary1 items-center h-full justify-center font-bold text-[32px]  text-secondary">
            <p className="mt-3">Add Task </p> <TiPlus className="text-secondary" />
          </button>
          <ul tabIndex={0} className="dropdown-content bg-primary1 z-[1] max-h-[500px] mt-[330px] border border-secondary menu p-2 shadow rounded-box w-64">
            <AddTask id={props.id} />
          </ul>
        </div>
      </MainWrapper>
    </DndContext>
  );
};

const MainWrapper = styled("div", {
  display: "flex",
  backgroundColor: "#F4EEFF",
  padding: "25px 10px 40px 10px",
  fontFamily: "Anek Telugu",
  height: "78vh",
  gap: "30px",
  overflowX: "auto",
});