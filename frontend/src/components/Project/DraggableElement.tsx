import { FC, useMemo } from "react";
import { styled } from "@stitches/react";
import { Draggable } from "../../primitives";
import { IDraggableElement } from "@/composables/React.types";

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
  content,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const handleClick = (itemIdentifier: string) => {
      alert(itemIdentifier);
  }

  return (
    <div className="relative">
      <Draggable id={itemIdentifier}>
        <ElementWrapper>
            <ElementText>{content}</ElementText>
        </ElementWrapper>
        <Button onClick={() => handleClick(itemIdentifier)} className="absolute bottom-2 right-2">Edit</Button>
      </Draggable>
    </div>
    
  );
};

const Button = styled("button", {
  marginTop: 12,
  '&.dragging': {
    cursor: 'grabbing', // Change cursor style when dragging
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

