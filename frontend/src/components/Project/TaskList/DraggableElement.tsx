import { FC, useMemo, useState } from "react";
import { styled } from "@stitches/react";
import { Draggable } from "../../../primitives";
import { IDraggableElement } from "@/composables/React.types";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Modal } from "flowbite-react";
import { DeleteTaskList } from "./DeleteTaskList";
import { UpdateTaskList } from "./UpdateTaskList";
import moment from "moment";

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
  content,
  element
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const [opens, setopens] = useState("");
  return (
    <div className="relative">
      <Draggable id={itemIdentifier}>
        <ElementWrapper style={ new Date(element.setdate) < new Date() ? {backgroundColor: "pink", color: "#424874"} : {backgroundColor: "#DCD6F7",color: "#424874"} }>
          <ElementText>{content}</ElementText>
          <p className="absolute top-2 right-2 text-[12px]">{moment(element.setdate).format("YYYY-MM-DD")}</p>
        </ElementWrapper>
      </Draggable>
      <Button
        onClick={() => setopens("update")}
        className="absolute bottom-2 right-9"
      >
        <CiEdit className="h-6 text-secondary font-semibold w-6" />
      </Button>
      <Button
        onClick={() => setopens("delete")}
        className="absolute bottom-2 right-2"
      >
        <RiDeleteBin6Fill className="h-6 text-secondary w-6" />
      </Button>
      {opens === "delete" && (
        <Modal show={true} size={"3xl"} onClose={() => setopens("")}>
          <Modal.Body className="bg-red-100 rounded-xl">
            <DeleteTaskList
              id={itemIdentifier}
              setopens={(bools) => setopens(bools)}
            />
          </Modal.Body>
        </Modal>
      )}
      {opens === "update" && (
        <Modal show={true} size={"3xl"} onClose={() => setopens("")}>
          <Modal.Body className="bg-primary rounded-xl">
            <UpdateTaskList
              id={itemIdentifier}
              setopens={(bools) => setopens(bools)}
              tasklist={element}
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
