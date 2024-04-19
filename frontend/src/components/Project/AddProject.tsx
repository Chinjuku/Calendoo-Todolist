import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Arrowleft from "/svg/arrow-left.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/api-get/UserContext";
import { useContext, useEffect, useState } from "react";
import { createProject } from "@/api/post/Project/createProject";
import { showProjects } from "@/api/get/Project/getProjects";
import { projectSchema } from "@/composables/Validation";
import { colors } from "@/composables/initial-data";

type ProjectData = {
    projectname: string
    color: string
    id: string
    userId: string
}

export const AddProject = () => {
    const { user } = useContext(UserContext);
    const [project, setProject] = useState<ProjectData[]>([]);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project: "",
      color: "",
    },
  });
  function onSubmit(values: z.infer<typeof projectSchema>) {
    createProject(values.project, values.color, user?.id)
  }
  useEffect(() => {
    const fetchData = async () => {
        const fetchProject = await showProjects(user?.id)
        setProject(fetchProject);
        console.log(fetchProject)
    };
    fetchData();
  }, [user?.id]);
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1">
        
        <div className="absolute top-6 left-8">
          <Link className="Second text-[36px] flex gap-5" to="/">
            <img src={Arrowleft} alt="" />
            Home
          </Link>
        </div>
        <div className="w-[92%] h-[90%] bg-primary rounded-[52px] p-[48px]">
          <h1 className="Second text-[44px]">Create New Project</h1>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-10 h-10 my-9">
                  <div className="w-2/5">
                    <FormField
                      control={form.control}
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px]">
                            Project Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="outline-none rounded-[10px] text-secondary px-5 py-4"
                              placeholder="Your Project Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-2/5">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px]">
                            Choose Color
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-[5px] outline-none">
                                  <SelectValue placeholder="Select Color" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="font-bold rounded">
                                {colors.map((colors) => (
                                  <SelectItem
                                    className="focus:bg-secondary1 rounded"
                                    value={colors}
                                  >
                                    {colors}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="bg-secondary1 text-primary rounded-[10px] mt-[30px] text-[18px] px-5 py-4 hover:bg-secondary"
                    type="submit"
                  >
                    Create Project
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <hr className="border-2 border-secondary" />
          <div className="mt-[30px] grid grid-cols-4 h-[472px] gap-7 overflow-y-auto px-[20px]">
            {/* Mapping Show Project Names */}
            {project && project.map((data) => (
                <button onClick={() => navigate(`/project/${data.id}`)} key={data.id} style={{backgroundColor : `${data.color}`}} className="w-full rounded-lg h-[120px] flex items-center justify-center text-[22px] font-bold text-secondary">
                {data.projectname}
                </button>
            ))}
          </div>
        </div>
      </div>
  )
}
