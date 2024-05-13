import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

import { FaExclamationTriangle } from "react-icons/fa";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
        <div className="w-full flex justify-center items-center">
          <FaExclamationTriangle className="text-destructive" />
        </div>
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to Login" href="/login" />
      </CardFooter>
    </Card>
  );
};
