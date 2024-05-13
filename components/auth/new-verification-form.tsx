"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import { newVerification } from "@/lib/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    // console.log(token);
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data: { success?: string; error: string }) => { // Define the type of 'data'
        if (data.success === undefined) {
          setSuccess(''); // Handle the absence of 'success' property
        } else {
          setSuccess(data.success);
        }
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
      // .then((data) => {
      //   if(!data.success) {
      //     setSuccess('')
      //   } else {
      //     setSuccess(data.success);
      //   }
      //   setError(data.error);
      // })
      // .catch(() => {
      //   setError("Something went wrong!");
      // });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming Your Verification"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
