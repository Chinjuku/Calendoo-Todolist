import { toast } from "@/components/ui/use-toast";
import axios from "axios";


export const createTask = async (taskname: string, boardId: string | undefined) => {
    const data = {
        taskname: taskname,
        boardId: boardId
    }
    console.log(data);
    try {
        const res = await axios.post("http://localhost:8888/api/task/create", data)
        // .then(res => console.log(res.status))
        console.log(res.status)
        if (res.status === 200) {
            window.location.reload()
            toast({
                variant: "success",
                title: "You add task to board successfully.",
                description:
                    "Your name task is: " +
                    taskname
            });
        }
        
    } catch (err) {
        toast({
            variant: "destructive",
            title: taskname + " already add to Project!!",
        });
    }

}