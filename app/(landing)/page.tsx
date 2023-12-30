import { Badge } from "@/components/ui/badge";
import { Medal } from "lucide-react";
import { Hero } from "./_components/hero";

const LandingPage = () => {
  return (
    <main className="pt-24 pb-16 md:pt-32 md:pb-20 px-4">
      <div className="flex items-center justify-center">
        <Badge className="px-4 py-1 bg-purple-700 hover:bg-purple-600 uppercase text-xs md:text-base">
          <Medal className="mr-2 w-5 h-5 md:w-6 md:h-6" />
          No.1 Task Management Tools
        </Badge>
      </div>
      <Hero />
    </main>
  );
};

export default LandingPage;
