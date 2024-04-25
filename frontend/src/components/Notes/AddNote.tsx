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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AddNoteSchema } from "@/composables/Validation";
import DatePicker from "react-datepicker";
import { BoolNoteCheck } from "@/composables/React.types";
import { Calendar } from "lucide-react";
import { useContext } from "react";
import { ListContext } from "@/contexts/api-get/ListContext";
import { createNote } from "@/api/post/Notes/createNote";
import { UserContext } from "@/contexts/api-get/UserContext";

const AddNote = (props: BoolNoteCheck) => {
  const { list } = useContext(ListContext)
  const { user } = useContext(UserContext)
  const form = useForm<z.infer<typeof AddNoteSchema>>({
    resolver: zodResolver(AddNoteSchema),
  });
  const onSubmit = (data: z.infer<typeof AddNoteSchema>) => {
    "use server"
    props.checkClose(false)
    createNote(data, user?.id)
  };
  return (
    <div
      className="bg-primary w-full max-h-[602px] py-8 px-10"
    >
        <h1 className="Second text-[44px]">Add Note</h1>
        <div>
          <button onClick={() => props.checkClose(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-extrabold">
            ✕
          </button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
              <div className="text-secondary mt-2 flex gap-10">
                <div className="w-1/2 space-y-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-5">
                            <h1 className="text-[28px]">Title :</h1>
                            <Input
                              className="outline-none w-3/4 rounded-[10px] text-secondary"
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
                    control={form.control}
                    name="namelist"
                    render={({ field }) => (
                      <FormItem>
                        <h1 className="text-[28px]">Name List</h1>
                        <select
                          name="namelist"
                          onChange={field.onChange}
                          defaultValue={field.value}
                          className="select w-full max-w-xs"
                        >
                          <option value="">Select Name Lists</option>
                          {
                            list && list.map((item) => {
                              return (
                                <option value={item.id} style={{color : `${item.color}`}}>{item.namelist}</option>
                              )
                            })
                          }
                        </select>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormMessage className="text-[12px]" />
                  <div></div>
                </div>
                <div className="w-1/2 space-y-5">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-5">
                          <h1 className="text-[28px]">Date :</h1>
                          <Calendar/>
                          <DatePicker
                            className="py-[10px] px-[15px] text-secondary font-bold rounded-[10px]"
                            onChange={(date) => field.onChange(date)}
                            selected={field.value || new Date()}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-5">
                  <h1 className="text-[28px]">Time :</h1>
                  <FormField
                    control={form.control}
                    name="starttime"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-5">
                          <input
                            className="text-secondary font-bold rounded-[10px] py-2 px-4"
                            type="time"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <h1>-</h1>
                        </div>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endtime"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-5">
                          <input
                            className="text-secondary font-bold rounded-[10px] py-2 px-4"
                            type="time"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  </div>
                  <FormField
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
                          <option value="">Select Piority</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                className="btn rounded"
                type="submit"
              >
                Create Note
              </Button>
            </form>
          </Form>
        </div>
    </div>
  );
};

export default AddNote;
