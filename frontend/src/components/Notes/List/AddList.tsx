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
import { Input } from "../../ui/input";
import { BooleanCheck } from "@/composables/React.types";
import { ListSchema } from "@/composables/Validation";
import { createList } from "@/api/post/createList";
import { useContext } from "react";
import { UserContext } from "@/contexts/api-get/UserContext";
import { colors } from "@/composables/initial-data";

const AddList = (props: BooleanCheck) => {
  const userContext = useContext(UserContext);
  const form = useForm<z.infer<typeof ListSchema>>({
    resolver: zodResolver(ListSchema),
  });
  const onSubmit = (data: z.infer<typeof ListSchema>) => {
    props.handleClick(false);
    createList(data.namelist, data.color, userContext.user?.id);
  };
  return (
    <div className="absolute bottom-[150px] left-[250px] max-h-[333px] w-[230px] z-10 bg-secondary text-white py-6 pb-10 px-5 rounded-[20px]">
      <button
        className="absolute right-4 top-[6px] p-1 font-extrabold"
        onClick={() => props.handleClick(false)}
      >
        X
      </button>
      <p className="text-primary font-bold text-[20px]">Add List</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <div className="text-secondary space-y-3 mt-2">
            <FormField
              control={form.control}
              name="namelist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name List</FormLabel>
                  <FormControl>
                    <Input
                      className="outline-none rounded-[10px] text-secondary"
                      placeholder="List Name..."
                      {...field}
                    />
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
                  <FormLabel className="text-white">Color</FormLabel>
                  <div className="flex items-center gap-2">
                    {field.value != null ? (
                      <div
                        className={`w-7 h-6`}
                        style={{ backgroundColor: `${field.value}` }}
                      ></div>
                    ) : null}
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
                  </div>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
          </div>
          <Button className="rounded" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddList;
