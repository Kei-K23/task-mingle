import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="hidden group md:flex items-center gap-x-2">
      <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
      <span className="group-hover:text-purple-700 font-semibold transition-all">
        TaskMingle
      </span>
    </Link>
  );
};
