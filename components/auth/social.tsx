"use client";

import { FcGoogle } from "react-icons/fc";
import { SiMicrosoftoutlook } from "react-icons/si";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <SiMicrosoftoutlook color="#0078d4" className="h-5 w-5" />
      </Button>
    </div>
  );
};
