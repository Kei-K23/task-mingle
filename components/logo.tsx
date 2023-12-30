import { Pen } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="hidden group md:flex items-center gap-x-2">
      <Pen className="w-5 h-5 hidden md:block group-hover:text-black text-purple-700 transition-all" />
      <span className="group-hover:text-purple-700 font-semibold transition-all">
        TaskMingle
      </span>
    </Link>
  );
};
