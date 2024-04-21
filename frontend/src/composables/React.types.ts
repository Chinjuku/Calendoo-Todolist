// const cn = (...args: string[]) => args.filter(Boolean).join(" ")

// @/components/Notes/Menu.tsx
export type Setup = {
    check: boolean;
}
export type Setup2 = {
    check: boolean;
}
export interface CheckOpenNotes {
    // handleSetDate: (day: string) => void
    handleSwitch: (bools: boolean) => void
    openSwitch: boolean
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
    title: string;
    taskname: string;
    description: string;
    piority: number;
    taskId: string;
}

export interface IColumn {
    id: string;
    heading: string;
    elements: IElement[];
}

export interface SwitchProps {
    handleSwitch: ( bools : boolean) => void;
}

export type UpdateNoteData = {
    id: string
    title: string;
    description: string;
    date: string;
    time: string;
    piority: number;
    list: {
        id: string;
        namelist: string
        color: string
    }
    userId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleClose: (ok : any) => void;
}

export interface OpenModals {
    [key: string]: boolean; // Define an index signature for string keys with boolean values
  }
  export interface OpenDelete {
    [key: string]: boolean; // Define an index signature for string keys with boolean values
  }
  export interface PropsDate {
    date: string;
  }

  export type NoteData = {
    userId: string
    listId: string
    id: string
    title: string;
    description: string;
    date: string;
    time: string;
    piority: number;
    list: {
        id: string
        namelist: string
        color: string
    }
}

export type BoardProps = {
    id: string
  }