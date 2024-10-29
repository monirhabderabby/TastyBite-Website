"use client";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import * as z from "zod";

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

const formSchema = z.object({
  title: z.string(),
  review: z.string(),
  ratings: z.number().optional(),
});

export default function ReviewForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
            name="ratings"
            render={({ field }) => (
              <FormItem className=" flex justify-center">
                <FormControl title="Set a ratings">
                  <ReactStars
                    count={field.value}
                    size={25}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#999999]">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write a review title"
                    className="text-black/80"
                    type=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>Give your review a title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#999999]">Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write here..."
                    className="text-black/80"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write your comments here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-[#999999] text-left">
            How we use your data: We’ll only contact you about the review you
            left, and only if necessary. By submitting your review, you agree to
            Judge.me’s terms, privacy and content policies.
          </p>
          <div className="w-full flex justify-center gap-x-5">
            <Button
              type="button"
              variant="outline"
              className=" text-primary-orange border-primary-orange hover:text-primary-orange/90 hover:bg-primary-orange/5  shadow-none rounded-none text-[18px]"
            >
              Cancel Review
            </Button>
            <Button
              type="submit"
              className="bg-primary-orange hover:bg-primary-orange/80 shadow-none rounded-none text-[18px]"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
