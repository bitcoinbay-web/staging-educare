"use client";

import { useRouter } from "next/navigation";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const RegisterButton = ({
  children,
  mode = "redirect",
  asChild,
}: RegisterButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    // console.log("Register Button Clicked");
    router.push("/register");
  };
  if (mode === "modal") {
    return <span>TODO: Implement Modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
