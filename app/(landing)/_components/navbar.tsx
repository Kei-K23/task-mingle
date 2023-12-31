import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-b-slate-300 fixed top-0 w-full px-8 py-3 md:py-4">
      <div className="flex items-center justify-center">
        <nav className="w-full md:max-w-screen-2xl flex items-center justify-between">
          <Logo />
          <div className="w-full md:w-auto flex items-center justify-between   gap-x-3">
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={"/sign-in"}
            >
              Sign in
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={"/sign-up"}
            >
              Get TaskMingle for Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
