import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // Adjust the import path based on your project structure
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession

// Define the schema for the form
const AccommodationSchema = z.object({
  recommendations: z.string().optional(),
});

// Define the prop types for form
interface FormProps {
  studentId: string;
}

const RecommendationForm: React.FC<FormProps> = ({ studentId }) => {
  const { data: signedData, signMessage, error: signError } = useSignMessage();
  const account = useAccount();
  const { data: session } = useSession(); // Get session data

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(AccommodationSchema),
    defaultValues: {
      recommendations: "",
    },
  });

  useEffect(() => {
    const storedValues = sessionStorage.getItem("recommendationFormValues");
    if (storedValues) {
      form.reset(JSON.parse(storedValues));
    }
  }, [form]);

  useEffect(() => {
    if (signedData && isSubmitting) {
      handleFinalSubmit();
    }
  }, [signedData]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem(
        "recommendationFormValues",
        JSON.stringify(values)
      );
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof AccommodationSchema>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("recommendationFormValues", jsonString);

    await signMessage({
      message: jsonString,
      account: account.address,
    });

    if (signError || error) {
      setError("User declined to sign the message. Please try again.");
      setIsSubmitting(false); // Re-enable the submit button
      return;
    }

    if (signedData) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    const values = form.getValues();
    const userId = studentId;

    if (!userId || !signedData) {
      console.error("User ID or signed message data is missing.");
      setError("User ID or signed message data is missing.");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: signedData,
    };

    try {
      const response = await fetch("/api/recommendationForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess("Form submitted successfully.");
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Failed to submit form:", result);
        setError("Failed to submit form.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred during submission.");
    } finally {
      setIsSubmitting(false); // Ensure the submit button is re-enabled
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <h2>Part IV: Accommodation Recommendation(s) - Optional</h2>
        <p>
          Based on the functional limitations indicated above, please share your
          recommendations and rationale for specific academic accommodations.
          AAS will review and consider these recommendations when determining an
          appropriate accommodation plan.
        </p>

        <FormField
          control={form.control}
          name="recommendations"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>
                Suggested academic accommodations (optional):
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your recommendations and rationale"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <p>Thank you for completing this form.</p>
      </form>
      {signedData && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(signedData, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
};

export default RecommendationForm;
