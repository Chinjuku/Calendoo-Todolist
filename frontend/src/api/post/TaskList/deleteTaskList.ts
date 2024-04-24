import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export const deleteTaskList = async (tasklistId: string) => {
    try {
        const res = await axios.delete(`http://localhost:8888/api/tasklist/delete/${tasklistId}`);
        if (res.status === 200) {
            // window.location.reload();
            return toast({
                variant: "success",
                title: "You delete task list Successfully!",
            });
        }
    } catch (err) {
        return toast({
            variant: "destructive",
            title: "You delete task list Failed!",
        });
    }
}