import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default Page;
