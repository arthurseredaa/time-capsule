import { createTransport, type Transporter } from "nodemailer";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(options: SendEmailOptions): Promise<Transporter> {
  const transporter = await getEmailTransporter();
  return new Promise(async (resolve, reject) => {
	const { to, subject, html } = options;
	const from = import.meta.env.SEND_EMAIL_FROM;
	const message = { to, subject, html, from: 'no-reply@easyrevenue.org' };
	// Send the email
	transporter.sendMail(message, (err: any, info: any) => {
	  // Log the error if one occurred
	  if (err) {
		console.error(err);
		reject(err);
	  }
	  resolve(info);
	});
  });
}

async function getEmailTransporter(): Promise<Transporter> {
  return new Promise((resolve, reject) => {
	if (!import.meta.env.RESEND_API_KEY) {
	  throw new Error("Missing Resend configuration");
	}
	const transporter = createTransport({
	  host: "smtp.resend.com",
	  secure: true,
	  port: 465,
	  auth: { user: "resend", pass: import.meta.env.RESEND_API_KEY },
	});
	resolve(transporter);
  });
}
