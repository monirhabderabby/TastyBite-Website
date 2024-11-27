import dynamic from "next/dynamic";
const ProfileEditContainer = dynamic(
  () => import("./_components/profile-edit/profile-edit-container")
);

const Page = () => {
  return (
    <div>
      <ProfileEditContainer />
    </div>
  );
};

export default Page;
