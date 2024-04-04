"use client";

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
import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input";
import { BooleanCheck } from "@/composables/React.types";

const ListSchema = z.object({
  namelist: z
  .string({
    required_error: "Please select an color to display.",
  }).min(1, { message: "Please select at least 1 character." }),
  color: z
    .string({
      required_error: "Please select an color to display.",
    }),
});

const AddList = (props: BooleanCheck) => {
  const form = useForm<z.infer<typeof ListSchema>>({
    resolver: zodResolver(ListSchema),
  });

  const onSubmit = (data: z.infer<typeof ListSchema>) => {
    console.log(data);
    props.handleClick(false);
    toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
    })
  }
  return (
    <div className="absolute bottom-[150px] left-[250px] h-[333px] w-[230px] z-10 bg-secondary text-white py-6 px-5 rounded-[20px]">
      <button
        className="absolute right-4 top-[6px]"
        onClick={() => props.handleClick(false)}
      >
        close
      </button>
      <p className="text-primary font-bold text-[20px]">Add List</p>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                <div className="text-secondary space-y-3">
                <FormField
                control={form.control}
                name="namelist"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Name List</FormLabel>
                    <FormControl>
                    <Input className="outline-none rounded-[10px] text-secondary" placeholder="List Name..." {...field} />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-white" >Color</FormLabel>
                    <div className="flex items-center gap-2">
                        {/* {
                            field.value != null ? <div className={`w-7 h-6 bg-${field.value}`}></div> : null
                        } */}
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="rounded-[5px] outline-none">
                                <SelectValue placeholder="Select Color" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-bold rounded">
                                <SelectItem className="focus:bg-secondary1 rounded" value="orange">orange</SelectItem>
                                <SelectItem className="focus:bg-secondary1 rounded" value="green">green</SelectItem>
                                <SelectItem className="focus:bg-secondary1 rounded" value="gold">gold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <FormMessage className="text-[12px]" />
                    </FormItem>
                )}
                />
            </div>
            <Button className="rounded" type="submit">Submit</Button>
        </form>
        </Form>
    </div>
  );
};

export default AddList;
