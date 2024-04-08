// const cn = (...args: string[]) => args.filter(Boolean).join(" ")

// @/components/Notes/Menu.tsx
export type Setup = {
    check: boolean;
}
export type Setup2 = {
    check: boolean;
}
export interface CheckOpenNotes {
    clickStickyNotes: (bools: boolean, bools2: boolean) => void
}

// @/components/Notes/AddList.tsx
export type BooleanCheck = {
    handleClick: (bools: boolean) => void
}

// @/components/Notes/AddNote.tsx
export type BoolNoteCheck = {
    checkClose: (bools: boolean) => void
}

// @/components/Project/AddBoard.tsx
export interface AddBoardProps {
    handleSetup: (bools: boolean) => void;
}

// @/components/Project/DraggableElement.tsx
export interface IDraggableElement {
    identifier: string;
    content: string;
}

// @/components/Project/Column
export interface IElement {
    id: string;
    content: string;
    column: string;
}
export interface IColumn {
    heading: string;
    elements: IElement[];
}
