"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/api/post/Notes/deleteNote";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface DeleteNote {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAlert: (bools: any) => void;
  id: string;
}

export const DeleteNote = (props: DeleteNote) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({ mutationFn : () => deleteNote(props.id), 
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allnote"] })
      await queryClient.invalidateQueries({ queryKey: ["changeNote"] })
      await queryClient.invalidateQueries({ queryKey: ["dates"] })
      await queryClient.invalidateQueries({ queryKey: ["allnotes"] })
      await queryClient.invalidateQueries({ queryKey: ["today"] })
      await queryClient.invalidateQueries({ queryKey: ["noteperList"] })
      await queryClient.invalidateQueries({ queryKey: ["showallnote"] })
      props.handleAlert(false);
    },
    onError: () => {
      console.log("error");
    }
  });
    const onDelete = () => {
        mutate();  
    }
  return (
    <Alert variant="destructive" className="text-[26px] px-10 flex flex-col gap-1">
    <AlertCircle className="h-10 w-10" />
    <AlertTitle>Do you want to delete this note?</AlertTitle>
    <AlertDescription>
        <p className="text-lg">Your note id is {props.id}</p>
        <div className="flex justify-between px-12 mt-5">
            <Button onClick={() => props.handleAlert(false)} className="bg-secondary">No</Button>
            <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">Yes</Button>
        </div>
    </AlertDescription>
    </Alert>
  );
};
