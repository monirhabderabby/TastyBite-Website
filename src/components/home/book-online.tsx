"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonPrimary from "../common/button/buttonPrimary";
import SectionHeader from "../common/sectionHeader/sectionHeader";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please, provide a valid email.",
    }),
    date: z.date({
        message: "Please, pick a date for book.",
    }),
});

const BookOnline = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            date: undefined,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <div className="my-14 md:my-28 container">
            <div className="flex flex-col md:flex-row justify-center md:justify-between md:items-center gap-6">
                <div className="flex-1">
                    <div className="mb-5">
                        <SectionHeader
                            heading="Book Online"
                            title="Fresh From TastyBite"
                            textPosition="left"
                        />
                    </div>
                    <p className="text-sm mb-6 text-primary-black max-w-[480px] text-center md:text-left">
                        Elevate your dining experience with ease! Reserve a
                        table at our restaurant, where exquisite cuisine meets
                        inviting ambiance. Enjoy impeccable service and create
                        memorable moments with your loved ones, ensuring a
                        delightful and unforgettable mealtime.
                    </p>
                </div>

                {/* book form */}
                <div className="flex-1">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5 md:space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Your Name*"
                                                {...field}
                                                className="px-5 py-[10px] h-[50px] rounded-[50px] text-base leading-[22px] text-primary-gray"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Your Email*"
                                                type="email"
                                                {...field}
                                                className="px-5 py-[10px] h-[50px] rounded-[50px] text-base leading-[22px] text-primary-gray"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal text-primary-gray px-5 py-[10px] h-[50px] rounded-[50px] text-base leading-[22px]",
                                                            !field.value &&
                                                                "text-primary-gray"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center md:justify-start items-center">
                                <ButtonPrimary
                                    text="Book Now"
                                    btnType="submit"
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default BookOnline;
