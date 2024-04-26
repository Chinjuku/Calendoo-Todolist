import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateTaskList } from "@/api/post/TaskList/updateTaskList";
import { UpdateTaskListSchema } from "@/composables/Validation";
import { Textarea } from "../../ui/textarea";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateTaskListProps {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasklist: any
  setopens: (bools: string) => void;
}

export const UpdateTaskList = (props: UpdateTaskListProps) => {
  const form = useForm<z.infer<typeof UpdateTaskListSchema>>({
    resolver: zodResolver(UpdateTaskListSchema),
  });
  const  queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof UpdateTaskListSchema>) => 
        await updateTaskList(data, props.id)
    ,
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["taskLists"] })
        await queryClient.invalidateQueries({ queryKey : ["showalltask"]})
        props.setopens("")
    },
    onError: () => {
        console.log("error")
    },
  })
  const onSubmit = (data: z.infer<typeof UpdateTaskListSchema>) => {
    "use server";
    mutate(data)
  };
  return (
    <div>
      <h1 className="text-4xl Second text-center my-3">Update {props.tasklist.title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 Second p-7">
          <FormField
            defaultValue={props.tasklist.title}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center">
                    <h1 className="text-[28px]">Title :</h1>
                    <FormControl>
                    <Input className="w-[80%]" placeholder="" {...field} />
                    </FormControl>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            defaultValue={props.tasklist.description}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <label className="text-[28px]">Description</label>
                <FormControl>
                  <Textarea
                    className="outline-none h-[110px] w-[94%] rounded-[10px] text-secondary px-5 py-4"
                    placeholder="Description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            defaultValue={props.tasklist.piority}
            control={form.control}
            name="piority"
            render={({ field }) => (
              <FormItem>
                <h1 className="text-[28px]">Piority</h1>
                <select
                  name="piority"
                  onChange={(event) =>
                    field.onChange(parseInt(event.target.value))
                  }
                  className="select w-full max-w-xs"
                >
                  <option value={props.tasklist.piority}>{props.tasklist.piority}</option>
                  {
                    [1, 2, 3].map((piority) => {
                      if (piority != props.tasklist.piority)
                        return (
                          <option value={piority} key={piority}>
                          {piority}
                          </option>
                        );
                    })
                  }
                </select>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            defaultValue={new Date(props.tasklist.setdate)}
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-5">
                  <h1 className="text-[28px]">Date :</h1>
                  <Calendar />
                  <DatePicker
                    className="py-[10px] px-[15px] text-secondary font-bold rounded-[10px]"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <div className="flex justify-around">
            <Button
              onClick={() => props.setopens("")}
              className="bg-transparent text-black hover:text-white font-bold border-2 border-black"
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
