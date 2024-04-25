import { toast } from "@/components/ui/use-toast";
import { TaskListData } from "@/composables/Validation.types";
import axios from "axios";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const moveTaskList = async (id : string, itemOnDrop: any) => {
    const data = {
        id: id,
        taskId: itemOnDrop
    }
    // console.log(data);
    try {
        const res = await axios.put("http://localhost:8888/api/tasklist/update/taskId", data)
        if (res.status === 200) {
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

export const updateTaskList = async (tasklist: TaskListData, id : string) => {
    const data = {
        title: tasklist.title,
        description: tasklist.description,
        piority: tasklist.piority,
        setdate: tasklist.date,
    }
    try {
        const res = await axios.put(`http://localhost:8888/api/tasklist/update/${id}`, data)
        if (res.status === 200) {
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