import { EmailTemplate } from '@/components/email-template'; // Import the email template component
import { Resend } from 'resend'; // Import Resend for email sending

// Initialize Resend instance with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the POST request handler
export async function POST(toEmail: string, toName: string, urlLink: string) {
  try {
    // Send an email using Resend
    const { data, error } = await resend.emails.send({
      from: 'EduCare <info@educarelms.com>',
      to: [toEmail],
      subject: 'EduCare: Request to complete form',
      react: EmailTemplate({ toName: toName, urlLink: urlLink }),
    });

    // Handle any errors during email sending
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Return the data from the email sending operation
    return Response.json(data);
  } catch (error) {
    // Return a response with error information in case of failure
    return Response.json({ error }, { status: 500 });
  }
}
