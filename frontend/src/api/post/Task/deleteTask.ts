import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export const deleteTask = async (taskId: string) => {
    try {
        const res = await axios.delete(`http://localhost:8888/api/task/delete/${taskId}`);
        if (res.status === 200) {
            return toast({
                variant: "success",
                title: "You delete task Successfully!",
            });
        }
    } catch (err) {
        return toast({
            variant: "destructive",
            title: "You delete task Failed!",
        });
    }
}