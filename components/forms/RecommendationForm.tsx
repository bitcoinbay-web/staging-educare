import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"; // Adjust the import path based on your project structure
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useAccount, useSignMessage } from "wagmi";
import { useEffect } from "react";

// Define the schema for the form
const AccommodationSchema = z.object({
  recommendations: z.string().optional(),
});

const RecommendationForm = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount()

  const form = useForm({
    resolver: zodResolver(AccommodationSchema),
    defaultValues: {
      recommendations: '',
    },
  });

  useEffect(() => {
    const storedValues = sessionStorage.getItem('recommendationFormValues');
    if (storedValues) {
      form.reset(JSON.parse(storedValues));
    }
    const savedData = sessionStorage.getItem("signMessageData");
    if (savedData) {
      signMessage(JSON.parse(savedData));
    }
  }, [form, signMessage]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem('recommendationFormValues', JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof AccommodationSchema>) {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("recommendationFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <h2>Part IV: Accommodation Recommendation(s) - Optional</h2>
        <p>Based on the functional limitations indicated above, please share your recommendations and rationale for specific academic accommodations. AAS will review and consider these recommendations when determining an appropriate accommodation plan.</p>
        
        <FormField
          control={form.control}
          name="recommendations"
          render={({ field }) => (
            <FormItem className='space-y-4'>
              <FormLabel>Suggested academic accommodations (optional):</FormLabel>
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
        
        <Button type="submit">Submit</Button>
        <p>Thank you for completing this form.</p>
      </form>
      {data && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
};

export default RecommendationForm;
