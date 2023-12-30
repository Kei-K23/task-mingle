import { buttonVariants } from "@/components/ui/button";
import { Pen } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-b-slate-300 fixed top-0 w-full px-8  py-4">
      <div className="flex items-center justify-center">
        <nav className="w-full md:max-w-screen-2xl flex items-center justify-between">
          <Link
            href={"/"}
            className="hidden group md:flex items-center gap-x-2"
          >
            <Pen className="w-5 h-5 hidden md:block group-hover:text-black text-purple-700 transition-all" />
            <span className="group-hover:text-purple-700 font-semibold transition-all">
              TaskMingle
            </span>
          </Link>
          <div className="w-full md:w-auto flex items-center justify-between   gap-x-3">
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={"/sign-in"}
            >
              Sign in
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={"/sign-in"}
            >
              Get TaskMingle for Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
