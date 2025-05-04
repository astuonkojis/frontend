// src/pages/ForgotPassword.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    fetch('http://localhost:3000/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => {
        setError('Nepavyko susisiekti su serveriu.');
      });
  };

  return (
    <main className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">Slaptažodžio atkūrimas</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <input
          type="email"
          placeholder="Įveskite savo el. paštą"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Siųsti slaptažodį
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <p className="mt-4 text-sm text-gray-600">
        Grįžti į{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          prisijungimą
        </Link>
      </p>
    </main>
  );
}
