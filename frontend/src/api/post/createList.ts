import { toast } from "@/components/ui/use-toast";
import axios from "axios";


export const createList = async (namelist: string, color: string, userId: string | undefined) => {
    const data = {
        namelist: namelist,
        color: color,
        userId: userId
    }
    try {
        const res = await axios.post("http://localhost:8888/api/list/create", data)
        // .then(res => console.log(res.status))
        console.log(res.status)
        if (res.status === 200) {
            toast({
                variant: "success",
                title: "You add list to Lists successfully.",
                description:
                    "Your name list is: " +
                    namelist +
                    " & Your color is: " +
                    color,
            });
        }
        window.location.reload()
    } catch (err) {
        toast({
            variant: "destructive",
            title: namelist + "already add to List!!",
        });
    }

}