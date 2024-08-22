import { sendDoctorInviteEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { toEmail, urlLink } = await req.json();

    await sendDoctorInviteEmail(toEmail, urlLink);

    return new Response(JSON.stringify({ success: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}