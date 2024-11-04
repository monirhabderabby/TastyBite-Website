// Packages
import { Pencil } from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";

const ProfileEditContainer = () => {
  return (
    <div className="w-full border-input border-[.5px] rounded-md p-3 md:p-5 flex justify-between text-primary-black">
      <div>
        <h1 className="text-[22px] font-narrow font-semibold">Profile</h1>
        <p className="text-primary-black/50">
          Manage your info and settings here.
        </p>
      </div>
      <Button size="icon" variant="outline">
        <Pencil />
      </Button>
    </div>
  );
};

export default ProfileEditContainer;
