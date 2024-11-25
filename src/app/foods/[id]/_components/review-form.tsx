"use client";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// Local imports
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFoodReviewMutation } from "@/redux/features/food/foodApi";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    title: z.string(),
    review: z.string(),
    rating: z.number(),
});

export default function ReviewForm({
    foodId,
    setOpen,
}: {
    foodId: string;
    setOpen: (value: boolean) => void;
}) {
    const [createFoodReview, { isLoading, isSuccess, isError }] =
        useCreateFoodReviewMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const reviewData = {
            ...values,
            clerkId: "user_2npvSYgJ4PVW52Tj4Y1uQWCEMol",
            foodId: `${foodId}`,
        };

        createFoodReview(reviewData);
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            toast.success("Review added successfully!");
        }
        if (isError) {
            toast.error("Error adding review");
        }
    }, [isSuccess, isError, setOpen]);

    return (
        <>
            <h1 className="text-center text-[#999999] text-[24px] font-bold">
                Write a review
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-3xl mx-auto py-10"
                >
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem className=" flex justify-center">
                                <div>
                                    <FormControl title="Set a ratings">
                                        <Rating
                                            style={{ maxWidth: 180 }}
                                            value={field.value as number}
                                            onChange={field.onChange}
                                            isRequired
                                            halfFillMode="svg"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-center mt-2" />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#999999]">
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Write a review title"
                                        className="text-black/80"
                                        type=""
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Give your review a title
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#999999]">
                                    Review
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write here..."
                                        className="text-black/80"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Write your comments here
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-[#999999] text-left">
                        How we use your data: We’ll only contact you about the
                        review you left, and only if necessary. By submitting
                        your review, you agree to Judge.me’s terms, privacy and
                        content policies.
                    </p>
                    <div className="w-full flex justify-center gap-x-5">
                        <Button
                            type="button"
                            variant="outline"
                            className=" text-primary-orange border-primary-orange hover:text-primary-orange/90 hover:bg-primary-orange/5  shadow-none rounded-none text-[18px]"
                            disabled={isLoading}
                        >
                            Cancel Review
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary-orange hover:bg-primary-orange/80 shadow-none rounded-none text-[18px]"
                            disabled={isLoading}
                        >
                            Submit Review
                            {isLoading && (
                                <Loader className="w-5 h-5 animate-spin" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
