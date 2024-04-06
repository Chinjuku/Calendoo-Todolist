"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema } from "@/composables/Validation"
import { toast } from "../ui/use-toast"

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      username: "",
      email: "",
      location: "",
      messages: "",
    },
  })
  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values)
    toast({
      variant: "success",
      title: "You send contact message Successfully!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-5">
          <div className="w-1/2">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Username</FormLabel>
                <FormControl>
                  <Input className="outline-none rounded-[10px] text-secondary px-5 py-4" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          <div className="w-1/2">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Email</FormLabel>
                <FormControl>
                  <Input className="outline-none rounded-[10px] text-secondary px-5 py-4" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
        </div>
        <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Location</FormLabel>
                <FormControl>
                  <Textarea className="outline-none h-[110px] rounded-[10px] text-secondary px-5 py-4" placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="messages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px]">Message</FormLabel>
                <FormControl>
                  <Textarea className="outline-none h-[110px] rounded-[10px] text-secondary px-5 py-4" placeholder="Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />
        <div className="flex justify-center">
          <Button className="bg-secondary1 text-primary rounded-[10px] text-[24px] px-8 py-7 hover:bg-secondary" type="submit">Send Message</Button>
        </div>
      </form>
    </Form>
  )
}
