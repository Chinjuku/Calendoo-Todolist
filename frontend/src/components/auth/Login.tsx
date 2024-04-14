"use client";
import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "@/middleware/useAuth";
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
import { loginSchema } from "@/composables/Validation";
import { loginUser } from "@/api/post/auth/loginUser";
import { useNavigate } from "react-router-dom";
import { MdOutlineMailLock } from "react-icons/md";
import { SiUblockorigin } from "react-icons/si";

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    loginUser(data);
    setTimeout(() => navigate("/"), 2000);
  }

  return (
    <div className="w-4/5 px-8 py-6">
      <h1 className="text-center my-4 text-4xl Second">Login Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-[16px] ml-[67px] text-secondary font-bold">
                    Email
                  </h1>
                  <div className="flex gap-5">
                    <MdOutlineMailLock className="w-10 h-10 text-secondary" />
                    <FormControl>
                      <Input
                        className="outline-none rounded-[10px] text-secondary px-5 py-4"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-[67px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-[16px] ml-[67px] text-secondary font-bold">Password</h1>
                  <div className="flex gap-5">
                    <SiUblockorigin className="w-10 h-10 text-secondary" />
                    <FormControl>
                      <Input
                        type="password"
                        className="outline-none rounded-[10px] text-secondary px-5 py-4"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-[67px]" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-secondary1 text-primary rounded-[10px] text-[19px] font-bold px-7 py-6 hover:bg-secondary"
              type="submit"
            >
              Login!.
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="flex gap-5 text-secondary text-[20px] items-center">Or Login Google</h1>
        <GoogleLogin
          onSuccess={authContext.loginUser}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </div>
    </div>
  );
};

export default Login;
