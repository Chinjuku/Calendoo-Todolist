// @/Notes/AddList.tsx
export type ListData = {
    namelist: string
    color: string
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
    color: string
}

export type ProjectData = {
    project: string
    color: string
}

export type ContactData = {
    username: string
    email: string
    location: string
    message: string
}

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    username: string
    email: string
    password: string
}

export interface TaskData {
    taskname: string
}

