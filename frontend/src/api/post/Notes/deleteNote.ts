import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export const deleteNote = async (noteid: string) => {
    try {
        const res = await axios.delete(`http://localhost:8888/api/note/delete/${noteid}`);
        if (res.status === 200) {
            window.location.reload();
            return toast({
                variant: "success",
                title: "You delete note Successfully!",
            });
        }
    } catch (err) {
        return toast({
            variant: "destructive",
            title: "You delete note Failed!",
        });
    }
}