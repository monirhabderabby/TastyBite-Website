import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
const Notification = dynamic(() => import("./_components/Notification"));

const Page = async () => {
  const user = await currentUser();

  return (
    <div className="container mt-[90px] ">
      <Notification userId={user?.id as string} />
    </div>
  );
};

export default Page;
