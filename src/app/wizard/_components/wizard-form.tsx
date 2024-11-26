"use client";

// Packages
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCreateUserMutation } from "@/redux/features/user/userApi";
export const WizardSchema = z.object({
  clerkId: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Please provide a valid email.",
  }),
  phone: z.string().optional(),
  image: z.string(),
});

const WizardForm = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return;

  const router = useRouter();
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();

  const form = useForm({
    resolver: zodResolver(WizardSchema),
    defaultValues: {
      clerkId: user?.id,
      name: user?.fullName || "",
      email: user?.emailAddresses[0].emailAddress || "",
      phone: "",
      image: user?.imageUrl.toString() || "",
    },
  });

  // Redirect to sign-in page if the user is not signed in
  if (!isSignedIn) {
    redirect("/sign-in");
  }

  async function onSubmit(data: unknown) {
    console.log(data);
    createUser(data);
  }

  useEffect(() => {
    if (isError) {
      toast.error("Failed to create user. Try again.");
    }

    if (isSuccess) {
      toast.success("User created successfully.");
      router.push("/profile");
    }
  }, [isError, isSuccess, router]);

  return (
    <div>
      <div className="md:w-[450px] lg:w-[550px] p-5 rounded-xl border-[1px] border-[#E7E6E6] text-primary-black">
        <h1 className="text-3xl font-medium font-inter text-primary-black">
          Welcome,
          <motion.span
            initial={{
              filter: "blur(1px)",
            }}
            animate={{
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            className="font-bold text-primary-black ml-1"
          >
            {user.firstName || "Dear"}
          </motion.span>{" "}
          🤚
        </h1>
        <div className="mb-5 md:mb-8">
          <p>Let&apos;s get started by setting up your profile</p>
        </div>

        {/* Form fields */}
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Your name"
                        {...field}
                        disabled={isLoading}
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email"
                        {...field}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="mb-2">Profile Image</p>
                <Image
                  src={user?.imageUrl}
                  alt=""
                  width={200}
                  height={200}
                  className="border rounded-xl"
                />
              </div>

              <div className="w-full flex justify-end">
                <AnimatePresence>
                  <Button
                    type="submit"
                    className="bg-primary-orange hover:bg-primary-orange/80 text-white  group border border-primary-orange"
                    disabled={isLoading}
                  >
                    <span className="mr-2">Continue</span>
                    {isLoading ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-5" />
                    )}
                  </Button>
                </AnimatePresence>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WizardForm;
