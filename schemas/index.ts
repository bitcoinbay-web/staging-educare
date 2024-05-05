import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters are required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  stdID: z.string().min(4, {
    message: "Student ID is required",
  }),
  walletID: z.string().min(20, {
    message: "Wallet not found",
  }),
});
