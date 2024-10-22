import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <section
      style={{ backgroundImage: `url(/images/banner-bg.webp)` }}
      className=" min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh] bg-primary-black w-full relative overflow-hidden"
    >
      <div className="pt-[100px]">
        <h1 className="uppercase text-[50px] lg:text-[150px] font-narrow font-bold text-center">
          Quality f<span className="text-primary-orange">oo</span>ds
        </h1>
        <p className="text-center text-[18px] lg:text-[24px] uppercase tracking-[4px] lg:tracking-[9px] text-primary-orange font-narrow font-normal">
          Healthy Food for healthy body
        </p>
      </div>

      <Hero />
    </section>
  );
}
