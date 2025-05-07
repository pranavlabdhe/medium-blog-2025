import { useState } from 'react';
import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://medium-blog-2025.onrender.com/api/reset-password/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="max-w-md mx-auto mt-20 height_class">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label>Email</Label>
        <TextInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Send Reset Link</Button>
      </form>
      {message && <Alert className="mt-5">{message}</Alert>}
    </div>
  );
}
