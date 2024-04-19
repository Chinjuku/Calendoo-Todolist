import { toast } from "@/components/ui/use-toast";
import axios from "axios";


export const createBoard = async (board: string, color: string, projectId: string | undefined) => {
    const data = {
        boardname: board,
        color: color,
        isStarred: false,
        projectId: projectId,
    }
    console.log(data)
    try {
        const res = await axios.post("http://localhost:8888/api/board/create", data)
        // .then(res => console.log(res.status))
        console.log(res.data)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add list to Lists successfully.",
                description:
                    "Your name list is: " +
                    board +
                    " & Your color is: " +
                    color,
            });
            window.location.reload()
        }
        
    } catch (err) {
        toast({
            variant: "destructive",
            title: board + " already add to Project!!",
        });
    }

}