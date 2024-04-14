import { toast } from "@/components/ui/use-toast";
import { AddNoteData } from "@/composables/Validation.types";
import axios from "axios";


export const createNote = async (data: AddNoteData, userId: string | undefined) => {
    const date = new Date(data.date);
    const formattedDate = date.toISOString().split('T')[0];
    const addnotedata = {
        title: data.title,
        description: data.description,
        date: data.date,
        time: formattedDate + "T" + data.time,
        piority: data.piority,
        listId: data.namelist,
        userId: userId
    }
    console.log(addnotedata);
    try {
        const res = await axios.post("http://localhost:8888/api/note/create", addnotedata)
        console.log(res.data)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add Note successfully.",
            });
        }
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Error to create Note!",
        });
    }

}