import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export const deleteBoard = async (boardId: string) => {
    try {
        const res = await axios.delete(`http://localhost:8888/api/board/delete/${boardId}`);
        if (res.status === 200) {
            return toast({
                variant: "success",
                title: "You delete board Successfully!",
            });
        }
    } catch (err) {
        return toast({
            variant: "destructive",
            title: "You delete board Failed!",
        });
    }
}