import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;
  const body = `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;
  await sendEmail(email, "Reset Your Password", body);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const body = `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`;
  await sendEmail(email, "Confirm Your Email", body);
};

export const sendDoctorInvitationEmail = async (email: string, doctorName: string) => {
  const registerLink = `${domain}/register`;
  const body = `
    <p>Hello ${doctorName},</p>
    <p>You have been selected by a student for consultation. Please <a href="${registerLink}">join EduCare</a> to proceed.</p>
  `;
  await sendEmail(email, "Join EduCare!", body);
};

export const sendFormStatusUpdateEmail = async (email: string, formName: string, status: string) => {
  const body = `<p>Your request for ${formName} was ${status}.</p>`;
  await sendEmail(email, `Form Status Update: ${formName}`, body);
};

export async function sendEmail(email: string, subject: string, body: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: "mail.csmafia.com",
      port: 465,
      auth: {
        user: "tech@csmafia.com",
        pass: "m9KNA7(}nr$i",
      },
    });

    let info = await transporter.sendMail({
      from: `"Team EduCare" <tech@csmafia.com>`,
      to: email,
      subject: subject,
      html: body,
    });

    console.log(`Message sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
