"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/composables/Validation";
import { MdOutlineMailLock } from "react-icons/md";
import { SiUblockorigin } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { registerUser } from "@/api/post/auth/registerUser";
import { SwitchProps } from "@/composables/React.types";

const Register = (props: SwitchProps) => {
const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
    },
    });

    function onSubmit(data: z.infer<typeof registerSchema>) {
        registerUser(data)
        props.handleSwitch(true)
        form.reset()
    }
  return (
    <div className="w-4/5 px-8 py-6">
      <h1 className="text-center my-4 text-4xl Second">Register Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
          <div className="flex flex-col gap-5">
          <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-[16px] ml-[12px] text-secondary font-bold">
                    Username
                  </h1>
                  <div className="flex gap-5">
                    <FormControl>
                      <Input
                        className="outline-none rounded-[10px] text-secondary px-5 py-4"
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FaUserCircle className="w-10 h-10 text-secondary" />
                  </div>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-[16px] ml-[12px] text-secondary font-bold">
                    Email
                  </h1>
                  <div className="flex gap-5">
                    <FormControl>
                      <Input
                        className="outline-none rounded-[10px] text-secondary px-5 py-4"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <MdOutlineMailLock className="w-10 h-10 text-secondary" />
                  </div>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-[16px] ml-[12px] text-secondary font-bold">Password</h1>
                  <div className="flex gap-5">
                    <FormControl>
                      <Input
                        type="password"
                        className="outline-none rounded-[10px] text-secondary px-5 py-4"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <SiUblockorigin className="w-10 h-10 text-secondary" />
                  </div>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-secondary1 text-primary rounded-[10px] text-[19px] font-bold px-7 py-6 hover:bg-secondary"
              type="submit"
            >
              Register!!
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Register