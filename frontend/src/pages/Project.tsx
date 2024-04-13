import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Arrowleft from '/svg/arrow-left.svg'
import { Link } from "react-router-dom"
import { projectSchema } from "../composables/Validation"

const Project = () => {
    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
            defaultValues: {
                project: "",
                color: "",
            },
        })
    function onSubmit(values: z.infer<typeof projectSchema>) {
        console.log(values)
    }
  return (
    <div className='h-screen w-full relative flex justify-center items-center pt-[4%] bg-primary1'>
        <div className="absolute top-6 left-8">
            <Link className="Second text-[36px] flex gap-5" to="/"><img src={Arrowleft} alt="" />Home</Link>
        </div>
        <div className='w-[92%] h-[90%] bg-primary rounded-[52px] p-[48px]'>
            <h1 className='Second text-[44px]'>Create New Project</h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center gap-10 h-10 my-9">
                            <div className="w-2/5">
                                <FormField
                                control={form.control}
                                name="project"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[16px]">Project Name</FormLabel>
                                    <FormControl>
                                    <Input className="outline-none rounded-[10px] text-secondary px-5 py-4" placeholder="Your Project Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />
                            </div>
                            <div className="w-2/5">
                                <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[16px]">Choose Color</FormLabel>
                                    <FormControl>
                                    <Input className="outline-none rounded-[10px] text-secondary px-5 py-4" placeholder="Color" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />
                            </div>
                            <Button className="bg-secondary1 text-primary rounded-[10px] mt-[30px] text-[18px] px-5 py-4 hover:bg-secondary" type="submit">Create Project</Button>
                        </div>
                    </form>
                </Form>
            </div>
            <hr className='border-2 border-secondary' />
            <div className="mt-[30px] grid grid-cols-4 h-[472px] gap-7 overflow-y-auto px-[20px]">
                {/* Mapping Show Project Names */}
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
                <button className="w-full h-[120px] flex items-center justify-center bg-red-200">
                    Chinjuku Sudlhor
                </button>
            </div>
        </div>
    </div>
  )
}

export default Project