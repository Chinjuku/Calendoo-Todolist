import { FC, useMemo, useState } from "react";
import { styled } from "@stitches/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from "radash";
import Add from "/svg/Add.svg";
import { Droppable } from "../../../primitives";
import { DraggableElement } from "../TaskList/DraggableElement";
import { IColumn } from "@/composables/React.types";
import { AddTaskList } from "../TaskList/AddTaskList";
import { MdDeleteForever } from "react-icons/md";
import { DeleteTask } from "@/components/Project/Task/DeleteTask";
import { Modal } from "flowbite-react";

export const Column: FC<IColumn> = ({ id, heading, elements }) => {
  const [openBox, setOpenBox] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const columnIdentifier = heading;
  const amounts = useMemo(
    () => elements.filter((elm) => elm.taskname === columnIdentifier).length,
    [elements, columnIdentifier]
  );

  return (
    <div id={id}>
      {" "}
      {/* Wrap the column with Draggable */}
      <div className="w-[295px] border-dashed border-2 border-black border-opacity-65 p-[10px] rounded-[10px] overflow-y-hidden overflow-x-hidden">
        <ColumnHeaderWrapper className="bg-secondary flex items-center">
          <p className="font-bold text-primary text-lg">{heading}</p>
          <div className="flex gap-2 items-center">
            <ColumnTasksAmout>{amounts}</ColumnTasksAmout>
            {amounts === 0 && (
              <div>
                <button
                  onClick={() => setOpenAlert(true)}
                  className="text-white"
                >
                  <MdDeleteForever className="mt-1 w-7 h-7" />
                </button>
              </div>
            )}
            {openAlert && (
              <Modal
                show={openAlert}
                size={"3xl"}
                onClose={() => setOpenAlert(false)}
              >
                <Modal.Body className="bg-red-100 rounded-xl">
                  <DeleteTask
                    id={id}
                    setOpenAlert={(bools) => setOpenAlert(bools)}
                  />
                </Modal.Body>
              </Modal>
            )}
          </div>
        </ColumnHeaderWrapper>
        <Droppable id={id}>
          {elements.map((elm, elmIndex) => (
            <DraggableElement
              key={`draggable-element-${elmIndex}-${id}`}
              identifier={elm.id}
              content={elm.title}
              element={elm}
            />
          ))}
          <DropPlaceholder />
        </Droppable>
        <button
          onClick={() => setOpenBox(true)}
          className="bg-white w-full py-2 rounded-md flex justify-center"
        >
          <img src={Add} alt="" />
        </button>
      </div>
      {openBox && (
        <AddTaskList id={id} setOpen={(bools) => setOpenBox(bools)} />
      )}
    </div>
  );
};

const DropPlaceholder = styled("div", {
  height: 35,
  backgroundColor: "transparent",
  marginTop: 15,
  marginBottom: -30,
});

const ColumnHeaderWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  // variants: {
  //   variant: {
  //     backlog: {
  //       background: "#F94892",
  //     },
  //     inProgress: {
  //       background: "#5800FF",
  //     },
  //     inReview: {
  //       background: "#ffb300",
  //     },
  //     done: {
  //       background: "#24A19C",
  //     }
  //   },
  // },
  padding: "15px 10px 15px 10px",
  borderRadius: 10,
});

const ColumnTasksAmout = styled("span", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 30,
  height: 30,
  borderRadius: 6,
  color: "#FFF",
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.18 )",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});
