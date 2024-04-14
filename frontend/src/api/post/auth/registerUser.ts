import { RegisterData } from "@/composables/Validation.types";
import axios from "axios";
import { toast } from "@/components/ui/use-toast"

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axios.post("http://localhost:8888/api/user/create", data);
        if (response.status === 200) {
            toast({
                variant: "success",
                title: "Register User Successfully!..",
            });
        }
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Register User Failure!",
        });
    }
    
}