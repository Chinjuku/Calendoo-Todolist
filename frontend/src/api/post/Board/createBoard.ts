import { toast } from "@/components/ui/use-toast";
import { addBoardSchema } from "@/composables/Validation";
import axios from "axios";
import { z } from "zod";


export const createBoard = async (values: z.infer<typeof addBoardSchema>, projectId: string | undefined) => {
    const data = {
        boardname: values.boardname,
        color: values.color,
        isStarred: false,
        projectId: projectId,
    }
    console.log(data)
    try {
        const res = await axios.post("http://localhost:8888/api/board/create", data)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add board to Boards successfully.",
                description:
                    "Your name Board is: " +
                    data.boardname +
                    " & Your color is: " +
                    data.color,
            });
        }
        
    } catch (err) {
        toast({
            variant: "destructive",
            title: data.boardname + " already add to Project!!",
        });
    }

}