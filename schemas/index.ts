// import { UserRole } from "@/lib/models/user.model";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(1, {
    message: "Minimuum of 6 characters is required",
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

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.DOCTOR, UserRole.STUDENT]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New Password is Required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is Required!",
      path: ["password"],
    }
  );

export const DoctorRegisterSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters are required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  walletID: z.string().min(20, {
    message: "Wallet not found",
  }),
});

export const DoctorFormSchema = z.object({
  phoneNumber: z.string().min(1),
  gender: z.enum(["Male", "Female", "Other"]),
  healthCarePractitionerType: z.string().min(1),
  licenseNumber: z.string().min(1),
  acceptingNewClients: z.enum(["Yes", "No"]),
  languages: z
    .array(z.string())
    .nonempty({ message: "At least one language is required" }),
  appointmentTypes: z
    .array(z.string())
    .nonempty({ message: "At least one language is required" }),
  servicesProvided: z
    .array(z.string())
    .nonempty({ message: "At least one language is required" }),
  businessName: z.string().min(1),
  businessWebsite: z.string().url().optional().or(z.literal("")),
  businessAddress: z.string().min(1),
  bookingEmailAddress: z.string().email(),
  bookingPhoneNumber: z.string().min(1),
  onlineBookingURL: z.string().url().optional().or(z.literal("")),
  faxNumber: z.string().optional().or(z.literal("")),
  bio: z.string().min(1),
});
