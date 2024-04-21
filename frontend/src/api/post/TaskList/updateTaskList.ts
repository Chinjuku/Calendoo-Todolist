import { toast } from "@/components/ui/use-toast";
import axios from "axios";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTaskList = async (id : string, itemOnDrop: any) => {
    const data = {
        id: id,
        taskId: itemOnDrop
    }
    console.log(data);
    try {
        const res = await axios.put("http://localhost:8888/api/tasklist/update/taskId", data)
        console.log(res.status)
        if (res.status === 200) {
            window.location.reload()
            toast({
                variant: "success",
                title: "You move tasklist to task successfully.",
            });
        }
        
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Move tasklist to task failed",
        });
    }

}