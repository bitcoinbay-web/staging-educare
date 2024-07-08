"use client";

import { RegisterForm } from "@/components/auth/register-form";
import React from "react";

import Image from "next/image";
import AuthNav from "@/components/Navbar/auth-nav";

const Register: React.FC = () => {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-custom1 via-custom2 to-custom3">
        <AuthNav />
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Create Account</h1>
          <p className="text-sm mx-8">
            Fill the below information to register new account with EDUCARE.
          </p>
        </div>

        <div className="w-full max-w-md mt-8 mb-20">
          <RegisterForm />
        </div>
      </main>
    </>

    // /* create local state to save account information after signin */
    // const [account, setAccount] = useState<String>("");

    // // State to store connected account

    // useEffect(() => {
    //   if (address) {
    //     // If the address exists (i.e., connected), set the input field value
    //     //@ts-ignore
    //     document.getElementById("wallet-input").value = address;
    //     // Change the button text to "Connected"
    //     //@ts-ignore
    //     document.getElementById("connect-button").innerText = "Connected";
    //   }
    // }, [address]);
    // const router = useRouter();
    // const pathname = usePathname();
    // const [error, setError] = useState("");

    // const isValidEmail = (email: string) => {
    //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //   return emailRegex.test(email);
    // };

    // 2. Define a submit handler.
    // async
    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //   if (!isValidEmail(values.email)) {
    //     setError("Email is invalid");
    //     return;
    //   }
    //   if (!values.password || values.password.length < 8) {
    //     setError("Password is invalid");
    //     return;
    //   }
    //   try {
    //     // const res = await updateUser({
    //     //   email: values.email,
    //     //   password: values.password,
    //     //   stdID: values.stdID,
    //     //   walletID: values.walletID,
    //     //   path: values.pathname,
    //     // });
    //     const { email, password, stdID, walletID } = values;
    //     const res = await fetch("/api/register", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email,
    //         password,
    //         stdID,
    //         walletID,
    //       }),
    //     });
    //     if (res.status === 400) {
    //       setError("This email is already registered");
    //     }
    //     if (res.status === 200) {
    //       setError("");
    //       router.push("/login");
    //     }
    //   } catch (error) {
    //     setError("Error, try again");
    //     console.log(error);
    //   }
    // };

    // // try {
    // //   // Send the form data to the API endpoint
    // //   const response = await fetch("api/register", {
    // //     method: "POST",
    // //     headers: {
    // //       "Content-Type": "application/json",
    // //     },
    // //     body: JSON.stringify(values),
    // //   });

    // // if (response.ok) {
    // // Redirect to student dashboard if the form submission is successful
    // //   } else {
    // //     console.error("Failed to submit form:", response.statusText);
    // //   }
    // // } catch (error) {
    // //   console.error("Error submitting form:", error);
    // // }

    // return (
    //   <div className="main">
    //     <div className="register-screen">
    //       <h1>Registration Form</h1>
    //       <Form {...form}>
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //           <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Email</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="Enter Your Email" {...field} />
    //                 </FormControl>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="password"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Password</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="Enter Password" {...field} />
    //                 </FormControl>
    //                 {/* <FormDescription>
    //               This is your public display name.
    //             </FormDescription> */}
    //                 {/* <FormMessage /> */}
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="stdID"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Student ID</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="Enter Your Student ID" {...field} />
    //                 </FormControl>
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="walletID"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Wallet Address</FormLabel>
    //                 <FormControl>
    //                   {/* <Input placeholder="Enter Your Student ID" /> */}
    //                   <div className="flex w-full items-center space-x-2">
    //                     <Input
    //                       id="wallet-input"
    //                       placeholder="Click on the button to connect to your wallet"
    //                       value={address || ""} // Ensure a default empty string if address is null/undefined
    //                       readOnly

    //                       // onChange={(e) => setAccount(e.target.value)}
    //                     />
    //                     <Button
    //                       type="button"
    //                       id="connect-button"
    //                       onClick={() => open()}
    //                     >
    //                       {address ? "Connected" : "Connect Wallet"}
    //                     </Button>
    //                   </div>
    //                 </FormControl>
    //               </FormItem>
    //             )}
    //           />
    //           <div className="button">
    //             <Button type="submit">Submit</Button>
    //           </div>
    //         </form>
    //       </Form>
    //       <div className="text-center text-gray-500 mt-4">- OR -</div>
    //       <a href="/login" className="text-center login-a">
    //         Already have an account?
    //       </a>
    //     </div>
    // </div>
  );
};

export default Register;
