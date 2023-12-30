import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <div className="mt-5 flex justify-center items-center flex-col">
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-4">
        <span className="text-purple-700 underline ">TaskMingle</span> will be
        your partner to team move 🚀
      </h1>

      <h2 className="text-center text-xl md:text-2xl mb-2">
        🗂️ Organize Your Work, Streamline Your Success
      </h2>

      <h2 className="text-center text-xl md:text-2xl mb-3">
        🤝🏻 Revolutionizing Task Management for Effortless Collaboration
      </h2>

      <p className="text-lg text-center md:max-w-2xl font-bold text-muted-foreground mx-auto">
        Welcome to <span className="text-purple-700">TaskMingle</span>, where
        organization meets productivity in one powerful platform. Simplify your
        projects, streamline tasks, and collaborate seamlessly with our
        intuitive interface.
      </p>

      <Button className="mt-6" asChild>
        <Link href={"/sign-up"}>Get TaskMingle for Free</Link>
      </Button>
    </div>
  );
};
