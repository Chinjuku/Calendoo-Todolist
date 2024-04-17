import { toast } from "@/components/ui/use-toast";
import axios from "axios";


export const createBoard = async (project: string, color: string, userId: string | undefined) => {
    const data = {
        projectname: project,
        userId: userId,
        color: color,
    }
    try {
        const res = await axios.post("http://localhost:8888/api/project/create", data)
        // .then(res => console.log(res.status))
        console.log(res.status)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add list to Lists successfully.",
                description:
                    "Your name list is: " +
                    project +
                    " & Your color is: " +
                    color,
            });
            window.location.reload()
        }
        
    } catch (err) {
        toast({
            variant: "destructive",
            title: project + " already add to Project!!",
        });
    }

}