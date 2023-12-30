import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <header className=" border-t border-t-slate-300 fixed bottom-0 w-full px-8 py-3 md:py-4">
      <div className="flex items-center justify-center">
        <nav className="w-full md:max-w-screen-2xl flex items-center justify-between">
          <Logo />
          <div className="w-full md:w-auto flex items-center justify-between   gap-x-3">
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={"/sign-in"}
            >
              Privacy Policy
            </Link>
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href={"/sign-in"}
            >
              Terms & Conditions
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
