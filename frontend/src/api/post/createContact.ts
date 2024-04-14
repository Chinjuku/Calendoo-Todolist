import { ContactData } from "@/composables/Validation.types";
import axios from "axios";
import { toast } from "@/components/ui/use-toast"

export const createContact = async (data: ContactData) => {
    const res = await axios.post('http://localhost:8888/api/contact/create', data)
    if (res.status === 200) {
        return toast({
            variant: "success",
            title: "You send contact message Successfully!",
        });
    } else {
        return toast({
            variant: "destructive",
            title: "You send contact message Failure!",
        });
    }
}