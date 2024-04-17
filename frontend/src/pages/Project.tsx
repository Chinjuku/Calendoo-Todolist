import { UserContextProvider } from "@/contexts/api-get/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { AddProject } from "@/components/Project/AddProject";


const Project = () => {

  return (
    <UserContextProvider>
        <Toaster />
        <AddProject />
    </UserContextProvider>
  );
};

export default Project;
