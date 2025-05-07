import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://medium-blog-2025.onrender.com/api/reset-password/reset-user-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="max-w-md mx-auto mt-20 height_class">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label>New Password</Label>
        <TextInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Reset Password</Button>
      </form>
      {message && <Alert className="mt-5">{message}</Alert>}
    </div>
  );
}
