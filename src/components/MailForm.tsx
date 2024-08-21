import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type {FormEvent} from "react";

const MailForm = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	const formData = new FormData(e.target as HTMLFormElement);
	const response = await fetch('/api/send-email', {
	  method: 'POST',
	  body: formData
	});

	const data = await response.json();

	if (data.success === true) {
	  window.location.href = '/success'
	}
  }

  return (
	<form onSubmit={handleSubmit}>
	  <div>
		<label htmlFor="send-email__recipient">To:</label>
		<Input type="email" name="recipient" id="send-email__recipient" required/>
	  </div>
	  <div>
		<label htmlFor="send-email__subject">Subject:</label>
		<Input type="text" name="subject" id="send-email__subject" required/>
	  </div>
	  <div>
		<label htmlFor="send-email__message">Message:</label>
		<Textarea name="message" id="send-email__message" required></Textarea>
	  </div>
	  <Button type="submit">Send message</Button>
	</form>
  );
};

export default MailForm;
