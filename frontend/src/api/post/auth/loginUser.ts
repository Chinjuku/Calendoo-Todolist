import { LoginData } from "@/composables/Validation.types";
import axios from "axios";
import { toast } from "@/components/ui/use-toast"

export const loginUser = async (data: LoginData) => {
    try {
        const response = await axios.post("http://localhost:8888/api/user/login", data);
        if (response.status === 200) {
            toast({
                variant: "success",
                title: "Login User Successfully!..",
            });
            localStorage.setItem("token", response.data.token);
        }
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Login User Failure!",
        });
    }
    
}