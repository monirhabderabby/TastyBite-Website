"use client";
// Packages
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Local imports
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
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  clerkId: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Please provide a valid email.",
  }),
  phone: z.string().optional(),
});

type FormValuesTypes = z.infer<typeof formSchema>;

const ProfileEditContainer = () => {
  const { isLoaded, user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  // API hooks
  const { isLoading, data, isError } = useGetSingleUserQuery(user?.id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const form = useForm<FormValuesTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clerkId: data?.data?.clerkId || user?.id,
      name: data?.data?.name || user?.firstName + " " + user?.lastName,
      email: data?.data?.email || "",
      phone: data?.data?.phone || "",
    },
  });

  // Reset form values when data changes
  useEffect(() => {
    const info = data?.data;
    form.reset({
      clerkId: info?.clerkId || user?.id,
      name: info?.name || user?.firstName + " " + user?.lastName,
      email: info?.email || "",
      phone: info?.phone || "",
    });
  }, [data?.data, user?.firstName, user?.lastName, form, user?.id]);

  // handle update
  const handleInfoUpdate = async (data: z.infer<typeof formSchema>) => {
    const response = await updateUser({ body: data });

    if (response?.data?.success) {
      setIsEditing(false);
    }
  };

  let content;

  if (isError) {
    content = <ErrorCard title="Error" message="Something went wrong!" />;
  } else if (data || isLoading) {
    content = (
      <SkeletonWrapper fullWidth isLoading={isLoading || !isLoaded}>
        <div className="w-full border-input border-[.5px] rounded-md p-3 md:p-5  text-primary-black">
          <div className="flex justify-between">
            <div>
              <h1 className="text-[22px] font-narrow font-semibold">Profile</h1>
              <p className="text-primary-black/50">
                Manage your info and settings here.
              </p>
            </div>
            {isEditing ? (
              <div className="flex items-start gap-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={form.handleSubmit(handleInfoUpdate)}
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin opacity-60" />
                  ) : (
                    <Save />
                  )}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Pencil />
              </Button>
            )}
          </div>

          <div className="mt-5">
            <Form {...form}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className={cn("w-full disabled:opacity-90")}
                          {...field}
                          disabled={isLoading || !isEditing}
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
                          className="w-full disabled:opacity-90"
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
                          className="w-full disabled:opacity-90"
                          {...field}
                          disabled={isLoading || !isEditing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </SkeletonWrapper>
    );
  }

  return content;
};

export default ProfileEditContainer;

const ErrorCard = ({ title, message }: { title: string; message: string }) => (
  <div className="w-full border-input border-[0.5px] rounded-md p-3 md:p-5 text-primary-black">
    <h1 className="text-[22px] font-narrow font-semibold">{title}</h1>
    <p className="text-red-600/50">{message}</p>
  </div>
);
