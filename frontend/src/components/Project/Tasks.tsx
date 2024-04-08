import "@fontsource/anek-telugu";
import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";

import { Column } from "@/components/Project";
import { IElement } from "@/composables/React.types"

const COLUMNS = ["Backlog", "In Progress", "In Review", "Done", "More"];
export const DEFAULT_COLUMN = "backlog";

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

export const Tasks = () => {
  const [data, setData] = useState<IElement[]>(DEFAULT_DATA_STATE);
//   console.log(data);
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

  return (
    <DndContext onDragEnd={handleOnDragEnd}>
      <MainWrapper>
        {COLUMNS.map((column, columnIndex) => (
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
      </MainWrapper>
    </DndContext>
  );
};

const MainWrapper = styled("div", {
  display: "flex",
  backgroundColor: "#F4EEFF",
  padding: "40px 10px",
  fontFamily: "Anek Telugu",
  height: "78vh",
  gap: "30px",
  overflowX: "scroll",
});