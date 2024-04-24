import { FC, useMemo, useState } from "react";
import { styled } from "@stitches/react";
import { Draggable } from "../../primitives";
import { IDraggableElement } from "@/composables/React.types";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Modal } from "flowbite-react";
import { DeleteTaskList } from "./DeleteTaskList";

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
  content,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const [deletes, setDeletes] = useState(false);
  const handleClick = (itemIdentifier: string) => {
    alert(itemIdentifier);
  };
  console.log(deletes)

  return (
    <div className="relative">
      <Draggable id={itemIdentifier}>
        <ElementWrapper>
          <ElementText>{content}</ElementText>
        </ElementWrapper>
      </Draggable>
      {/* {!isDragging && ( // Render button only if not dragging
            <Button
              onClick={() => handleClick(itemIdentifier)}
              className="absolute bottom-2 right-2"
            >
              Edit
            </Button>
          )} */}
      <Button
        onClick={() => handleClick(itemIdentifier)}
        className="absolute bottom-2 right-9"
      >
        <CiEdit className="h-6 text-secondary font-semibold w-6" />
      </Button>
      <Button
        onClick={() => setDeletes(true)}
        className="absolute bottom-2 right-2"
      >
        <RiDeleteBin6Fill className="h-6 text-secondary w-6" />
      </Button>
      {deletes == true && (
        <Modal show={deletes} size={"3xl"} onClose={() => setDeletes(false)}>
          <Modal.Body className="bg-red-100 rounded-xl">
            <DeleteTaskList
              id={itemIdentifier}
              setDeletes={(bools) => setDeletes(bools)}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

const Button = styled("button", {
  marginTop: 12,
  "&.dragging": {
    cursor: "grabbing", // Change cursor style when dragging
    opacity: 75, // Reduce opacity when dragging
  },
});

const ElementWrapper = styled("div", {
  background: "#f6f6f6",
  borderRadius: 10,
  height: 120,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 12,
});

const ElementText = styled("h3", {
  fontSize: 18,
  fontWeight: 600,
});
