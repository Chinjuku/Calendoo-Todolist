import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AddTaskListSchema } from "@/composables/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { createTaskList } from "@/api/post/TaskList/createTaskList";
import { Button } from "@/components/ui/button";
import { IoIosCloseCircle } from "react-icons/io";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

interface AddTaskListProps {
  id: string;
  setOpen: (bools: boolean) => void;
}

export const AddTaskList = (props: AddTaskListProps) => {
  const form = useForm<z.infer<typeof AddTaskListSchema>>({
    resolver: zodResolver(AddTaskListSchema),
  });
  const onSubmit = (data: z.infer<typeof AddTaskListSchema>) => {
    "use server";
    createTaskList(data, props.id);
    props.setOpen(false);
  };
  return (
    <div className="max-h-[600px] rounded-md mt-2 w-64 py-7 px-3 bg-primary1 items-center flex justify-center mx-5 relative">
      <button
        className="absolute right-2 top-2"
        onClick={() => props.setOpen(false)}
      >
        <IoIosCloseCircle className="text-secondary w-5 h-5" />
      </button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <h1 className="Second text-[22px] text-center">Create Task List</h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2 mt-3">
                    <h1 className="text-[20px]">Title :</h1>
                    <Input
                      className="outline-none w-[70%] rounded-[10px] text-secondary"
                      placeholder="Title..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <label className="text-[20px]">Description</label>
                <FormControl>
                  <Textarea
                    className="outline-none h-[110px] w-[95%] rounded-[10px] text-secondary px-5 py-4"
                    placeholder="Description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="piority"
            render={({ field }) => (
              <FormItem>
                <h1 className="text-[20px]">Piority :</h1>
                <select
                  name="piority"
                  onChange={(event) =>
                    field.onChange(parseInt(event.target.value))
                  }
                  className="select w-[95%] max-w-xs"
                >
                  <option value="">Select Piority</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start flex-col justify-center my-3">
                  <h1 className="text-[20px]">Date :</h1>
                  <div className="flex gap-3 items-center">
                    <Calendar />
                    <DatePicker
                      className="py-[7px] w-[94%] px-[15px] text-secondary font-bold rounded-[10px]"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
