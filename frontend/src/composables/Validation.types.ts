// @/Notes/AddList.tsx
export type ListData = {
    namelist: string,
    color: string,
}

// @/Notes/AddNote.tsx
export type AddNoteData = {
    title: string;
    description: string;
    namelist: string;
    date: Date;
    time: string;
    piority: number;
}

export interface AddBoardData {
    boardname: string
}

