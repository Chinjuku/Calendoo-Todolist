"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddBoardProps } from "@/composables/React.types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addBoardSchema } from "@/composables/Validation";

const AddBoard = (props: AddBoardProps) => {
  const form = useForm<z.infer<typeof addBoardSchema>>({
    resolver: zodResolver(addBoardSchema),
    defaultValues: {
      boardname: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addBoardSchema>) {
    console.log(values);
  }
  return (
    <div className="absolute w-[295px] max-h-[300px] transition-all bg-secondary z-50 left-[20.5%] p-4 rounded-xl">
      <h1 className="text-primary text-[36px] font-bold text-center">Add Board</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="boardname"
            render={({ field }) => (
              <FormItem>
                <h1 className="text-primary text-[20px]">Board Name :</h1>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-around">
          <Button onClick={() => props.handleSetup(false)} className="bg-transparent text-white font-bold border-2 border-white" type="button">Cancel</Button>
          <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddBoard;
