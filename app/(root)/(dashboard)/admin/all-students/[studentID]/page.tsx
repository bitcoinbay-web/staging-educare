// components/MintStatus.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { useState, useEffect } from "react";

const MintStatus = () => {
  const [onboardingStatus, setOnboardingStatus] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const pathname = usePathname();

  // Extract the userId from the URL path
  useEffect(() => {
    const extractedUserId = pathname.split("/").pop();
    if (extractedUserId) {
      setUserId(extractedUserId);
    } else {
      console.error("User ID could not be extracted from the URL");
    }
  }, [pathname]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear any existing success or error messages
    setError(undefined);
    setSuccess(undefined);

    if (!userId) {
      console.error("User ID is not available");
      setError("User ID is not available");
      return;
    }

    try {
      const response = await fetch("/api/mintStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, onboardingStatus }), // Include userId in the body
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Onboarding status updated:", data);
        setSuccess("Onboarding status updated successfully!");
        // Optionally, you could redirect or take further action here
      } else {
        console.error("Failed to update onboarding status:", data.error);
        setError(data.error || "Failed to update onboarding status.");
      }
    } catch (error) {
      console.error("Error occurred while updating onboarding status:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="pt-10 pl-20 ml-64 h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Status</CardTitle>
          <CardDescription>
            Update the status of Onboarding after updating the Token URI
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Onboarding Status</Label>
                <Select onValueChange={(value) => setOnboardingStatus(value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REGISTERED">Registered</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={!userId}>
              Submit
            </Button>
          </CardFooter>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Card>
    </div>
  );
};

export default MintStatus;
