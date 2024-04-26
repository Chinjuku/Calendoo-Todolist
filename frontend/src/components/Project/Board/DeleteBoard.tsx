"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "@/api/post/Board/deleteBoard";

interface BoardProps {
    id: string;
    setOpenDelete: (bools: boolean) => void;
}

export const DeleteBoard = (props: BoardProps) => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async () => 
            await deleteBoard(props.id)
        ,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey : ["countBoard"]})
            await queryClient.invalidateQueries({ queryKey : ["allBoard"]})
            props.setOpenDelete(false)
        },
        onError: () => {
            console.log("error")
        },
    })
    const onDelete = () => {
        mutate()
    }
  return (
    <Alert variant="destructive" className="text-[26px] primary px-10 flex flex-col gap-1">
    <AlertCircle className="h-10 w-10" />
    <AlertTitle>Do you want to delete this note?</AlertTitle>
    <AlertDescription>
        <p className="text-lg">Your note id is {props.id}</p>
        <div className="flex justify-between px-12 mt-5">
            <Button onClick={() => props.setOpenDelete(false)} className="bg-secondary">No</Button>
            <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">Yes</Button>
        </div>
    </AlertDescription>
    </Alert>
  )
}