import Notification from "@/app/notifications/_components/Notification";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  return (
    <div>
      <Notification userId={user?.id as string} />
    </div>
  );
};

export default Page;
