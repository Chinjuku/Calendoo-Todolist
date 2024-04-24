import { toast } from "@/components/ui/use-toast";
import { TaskListData } from "@/composables/Validation.types";
import axios from "axios";


export const createTaskList = async (getdata: TaskListData, taskId: string) => {
    const data = {
        title: getdata.title,
        description: getdata.description,
        piority: getdata.piority,
        taskId: taskId
    }
    console.log(data);
    try {
        const res = await axios.post("http://localhost:8888/api/tasklist/create", data)
        console.log(res.status)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add task to board successfully.",
                description:
                    "Your name task is: "
            });
        }
        
    } catch (err) {
        toast({
            variant: "destructive",
            title:  "Have error to create task list",
        });
    }

}