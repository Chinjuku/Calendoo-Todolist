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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addBoardSchema } from "@/composables/Validation";
import { colors } from "@/composables/initial-data";
import { createBoard } from "@/api/post/Board/createBoard";
import { useParams } from "react-router-dom";

const AddBoard = (props: AddBoardProps) => {
  const { projectId } = useParams();
  const form = useForm<z.infer<typeof addBoardSchema>>({
    resolver: zodResolver(addBoardSchema),
    defaultValues: {
      boardname: "",
      color: "",
    },
  });

  function onSubmit(values: z.infer<typeof addBoardSchema>) {
    createBoard(values.boardname, values.color, projectId)
    props.handleSetup(false)
  }
  return (
    <div className="absolute w-[295px] max-h-[600px] transition-all bg-secondary z-50 left-[20.5%] py-6 px-8 rounded-xl">
      <h1 className="text-primary text-[36px] font-bold text-center">Add Board</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="boardname"
            render={({ field }) => (
              <FormItem>
                <h1 className="text-primary text-[20px]">Board Name :</h1>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-white flex items-center gap-2 mb-3">Color{field.value != null && (
                      <div
                        className={`w-7 h-6`}
                        style={{ backgroundColor: `${field.value}` }}
                      ></div>
                    )}</h1>
                  
                  <div className="flex items-center gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-[5px] outline-none">
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="font-bold rounded w-full">
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
                  </div>
                  <FormMessage className="text-[12px]" />
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
