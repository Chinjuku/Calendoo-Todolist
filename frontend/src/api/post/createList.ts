import { toast } from "@/components/ui/use-toast";
import { ListSchema } from "@/composables/Validation";
import axios from "axios";
import { z } from "zod";

export const createList = async (data: z.infer<typeof ListSchema>, userId: string | undefined) => {
    const datas = {
        namelist: data.namelist,
        color: data.color,
        userId: userId
    }
    try {
        const res = await axios.post("http://localhost:8888/api/list/create", datas)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add list to Lists successfully.",
                description:
                    "Your name list is: " +
                    data.namelist +
                    " & Your color is: " +
                    data.color,
            });
        }
    } catch (err) {
        toast({
            variant: "destructive",
            title: data.namelist + "already add to List!!",
        });
    }

}