import { FC, useMemo } from "react";
import { styled } from "@stitches/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from "radash";
import Add from "/svg/Add.svg"
import { Droppable } from "../../primitives";
import { DraggableElement } from "./DraggableElement";
import { IColumn } from "@/composables/React.types";

export const Column: FC<IColumn> = ({ id, heading, elements }) => {
  const columnIdentifier = heading;
  const amounts = useMemo(
    () => elements.filter((elm) => elm.taskname === columnIdentifier).length,
    [elements, columnIdentifier]
  );
  // console.log(id, columnIdentifier, elements, amounts)
  const handleAddList = (column : string) => {
    alert(column)
  }

  return (
    <div id={id}> {/* Wrap the column with Draggable */}
      <div className="w-[295px] border-dashed border-2 border-black border-opacity-65 p-[10px] rounded-[10px] overflow-y-hidden overflow-x-hidden">
        <ColumnHeaderWrapper className="bg-secondary">
          <p className="font-bold text-primary text-lg">{heading}</p>
          <ColumnTasksAmout>{amounts}</ColumnTasksAmout>
        </ColumnHeaderWrapper>
        <Droppable id={id}>
          {elements.map((elm, elmIndex) => (
            <DraggableElement
              key={`draggable-element-${elmIndex}-${id}`}
              identifier={elm.id}
              content={elm.title}
            />
          ))}
          <DropPlaceholder />
        </Droppable>
        <button onClick={() => handleAddList(columnIdentifier)} className="bg-white w-full py-2 rounded-md flex justify-center">
            <img src={Add} alt="" />
        </button>
      </div>
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
