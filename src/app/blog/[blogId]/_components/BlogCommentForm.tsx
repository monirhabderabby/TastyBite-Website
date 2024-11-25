"use client";

import ButtonPrimary from "@/components/common/button/buttonPrimary";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { useCreateBlogCommentMutation } from "@/redux/features/blog/blogApi";

import { TBlog } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  comment: z
    .string()
    .min(2, {
      message: "Comment must be at least 2 characters.",
    })
    .max(200, { message: "Comment must be at most 200 characters." }),
});

const BlogCommentForm = ({ blog }: { blog: TBlog }) => {
  const [createBlogComment, { isLoading }] = useCreateBlogCommentMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
    mode: "all",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isLoading) return;
    const commentBody = {
      clerkId: "user_2npvSYgJ4PVW52Tj4Y1uQWCEMol",
      blogId: blog._id,
      comment: data.comment,
    };
    const response = await createBlogComment({ body: commentBody }).unwrap();
    if (response.data) {
      toast.success("Comment created successfully");
      form.reset();
    }
  }
  return (
    <div className=" border p-3 rounded-2xl mt-10">
      <p className="text-[33px] font-bold my-3">Post Comment</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 md:space-y-8"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Your Comment*"
                    {...field}
                    className="px-5 py-[10px] h-[100px] rounded-xl text-base leading-[22px] text-primary-gray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex  justify-center md:justify-start items-center">
            <ButtonPrimary text="Create comment" btnType="submit" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogCommentForm;
