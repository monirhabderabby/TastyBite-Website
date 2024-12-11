interface Props {
  message: string;
}

const BrandLoader = ({ message }: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center opacity-80 gap-y-3">
      <div className="font-courgette text-black font-semibold text-[40px]">
        <span className="text-primary-orange">Tasty</span>Bite
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="loader" />
        <div className="mt-2 text-primary-black">{message}</div>
      </div>
    </div>
  );
};

export default BrandLoader;
