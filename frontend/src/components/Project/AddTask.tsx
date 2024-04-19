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
import { Input } from "@/components/ui/input";
import { taskSchema } from "@/composables/Validation";
import { BoardProps } from "@/composables/React.types";
import { createTask } from "@/api/post/Task/createTask";


export const AddTask = (props: BoardProps) => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskname: "",
    },
  });
  function onSubmit(values: z.infer<typeof taskSchema>) {
    createTask(values.taskname, props.id)
  }
  return (
    <div className="flex flex-col py-6 px-4 gap-4">
      <h1 className="Second text-[36px]">Add Task</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full">
              <FormField
                control={form.control}
                name="taskname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px]">Name Task</FormLabel>
                    <FormControl>
                      <Input
                        className="outline-none rounded-[10px] text-secondary px-5 py-4"
                        placeholder="Your Task Name"
                        {...field}
                      />
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
              Create Task
            </Button>
        </form>
      </Form>
    </div>
  );
};
