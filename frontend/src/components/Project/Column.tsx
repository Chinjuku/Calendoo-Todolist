import { FC, useMemo } from "react";
import { styled } from "@stitches/react";
import * as _ from "radash";
import Add from "/svg/Add.svg"
import { Droppable } from "../../primitives";
import { DraggableElement } from "./DraggableElement";
import { IColumn } from "@/composables/React.types";

export const Column: FC<IColumn> = ({ heading, elements }) => {
  const columnIdentifier = useMemo(() => _.camal(heading), [heading]);

  const amounts = useMemo(
    () => elements.filter((elm) => elm.column === columnIdentifier).length,
    [elements, columnIdentifier]
  );

  const handleAddList = (column : string) => {
    alert(column)
  }

  return (
    <div id={columnIdentifier}> {/* Wrap the column with Draggable */}
      <div className="w-[295px] border-dashed border-2 border-black p-[10px] rounded-[10px] overflow-y-hidden overflow-x-hidden">
        <ColumnHeaderWrapper>
          <Heading>{heading}</Heading>
          <ColumnTasksAmout>{amounts}</ColumnTasksAmout>
        </ColumnHeaderWrapper>
        <Droppable id={columnIdentifier}>
          {elements.map((elm, elmIndex) => (
            <DraggableElement
              key={`draggable-element-${elmIndex}-${columnIdentifier}`}
              identifier={elm.id}
              content={elm.content}
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


const Heading = styled("h3", {
  color: "#FFF",
});

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
  background: "#5800FF",
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
