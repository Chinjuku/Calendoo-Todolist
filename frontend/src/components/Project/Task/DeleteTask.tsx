"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/api/post/Task/deleteTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TaskProps {
    id: string;
    setOpenAlert: (bools: boolean) => void;
}

export const DeleteTask = (props: TaskProps) => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: () => deleteTask(props.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey : ["tasks"]})
            await queryClient.invalidateQueries({ queryKey: ["countTask"] })
            await queryClient.invalidateQueries({ queryKey: ["countTasksfromBoard"] })
            props.setOpenAlert(false)  
        },
    })
    const onDelete = () => {
        mutate()   
    }
  return (
    <Alert variant="destructive" className="text-[26px] px-10 flex flex-col gap-1">
    <AlertCircle className="h-10 w-10" />
    <AlertTitle>Do you want to delete this note?</AlertTitle>
    <AlertDescription>
        <p className="text-lg">Your note id is {props.id}</p>
        <div className="flex justify-between px-12 mt-5">
            <Button onClick={() => props.setOpenAlert(false)} className="bg-secondary">No</Button>
            <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">Yes</Button>
        </div>
    </AlertDescription>
    </Alert>
  )
}
