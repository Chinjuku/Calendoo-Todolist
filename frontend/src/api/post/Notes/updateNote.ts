import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface UpdateformData {
    title: string;
    description: string;
    date: string;
    time: string;
    piority: string;
    listId: string;
}

export const updateNote = async (data: UpdateformData, noteId: string | undefined) => {
    const date = new Date(data.date);
    const formattedDate = date.toISOString().split('T')[0];
    const updatedata = {
        title: data.title,
        description: data.description,
        date: data.date,
        time: formattedDate + "T" + data.time,
        piority: parseInt(data.piority),
        listId: data.listId,
    }
    console.log(updatedata);
    try {
        const res = await axios.put(`http://localhost:8888/api/note/update/${noteId}`, updatedata)
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