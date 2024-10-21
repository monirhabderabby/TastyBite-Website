import Logo from "@/components/common/logo/Logo";

export default function Home() {
  return (
    <section className="min-h-screen bg-primary-black w-full flex justify-start items-start px-10">
      <div className="h-[60px]  flex items-center">
        <Logo />
      </div>
    </section>
  );
}
