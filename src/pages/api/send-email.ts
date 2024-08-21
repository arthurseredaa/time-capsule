import type { APIRoute } from "astro";
import { sendEmail } from "@/utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('Sending email...');
  // Get the form data submitted by the user on the home page
  const formData = await request.formData();
  const to = formData.get("recipient") as string | null;
  const subject = formData.get("subject") as string | null;
  const message = formData.get("message") as string | null;

  console.log({ to, subject, message });
  // Throw an error if we're missing any of the needed fields.
  if (!to || !subject || !message) {
	throw new Error("Missing required fields");
  }

  // Try to send the email using a `sendEmail` function we'll create next. Throw
  // an error if it fails.
  try {
	await sendEmail({ to, subject, html: message });
  } catch (error) {
	console.log(error)
	throw new Error("Failed to send email");
  }

  // Redirect the user to a success page after the email is sent.
  return redirect("/success");
};
