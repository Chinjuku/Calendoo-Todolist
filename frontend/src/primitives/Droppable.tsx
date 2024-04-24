import { FC, ReactNode, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

interface IDroppable {
  id: string;
  children: ReactNode;
}

export const Droppable: FC<IDroppable> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  // console.log(id)
  const style = useMemo(
    () => ({
      opacity: isOver ? 0.5 : 1,
      border: isOver ? "2px dashed green" : "none",
    }),
    [isOver]
  );

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
