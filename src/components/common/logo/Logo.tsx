import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-courgette text-white font-semibold text-[30px]"
    >
      <span className="text-primary-orange">Tasty</span>Bite
    </Link>
  );
};

export default Logo;
