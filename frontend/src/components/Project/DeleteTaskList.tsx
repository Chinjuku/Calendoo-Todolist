"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { deleteTaskList } from "@/api/post/TaskList/deleteTaskList";

interface TaskProps {
    id: string;
    setDeletes: (bools: boolean) => void;
}

export const DeleteTaskList = (props: TaskProps) => {
    const onDelete = () => {
        deleteTaskList(props.id)
        props.setDeletes(false)    
    }
  return (
    <Alert variant="destructive" className="text-[26px] px-10 flex flex-col gap-1">
    <AlertCircle className="h-10 w-10" />
    <AlertTitle>Do you want to delete this note?</AlertTitle>
    <AlertDescription>
        <p className="text-lg">Your note id is {props.id}</p>
        <div className="flex justify-between px-12 mt-5">
            <Button onClick={() => props.setDeletes(false)} className="bg-secondary">No</Button>
            <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">Yes</Button>
        </div>
    </AlertDescription>
    </Alert>
  )
}