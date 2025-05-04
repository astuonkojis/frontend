import { useState } from 'react';
import axios from 'axios';

export default function ChangePasswordForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword) {
      setMessage('Prašome užpildyti visus laukus');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/change-password', {
        email,
        oldPassword,
        newPassword,
      });

      setMessage(res.data.message || 'Slaptažodis pakeistas sėkmingai');
      setOldPassword('');
      setNewPassword('');
      setEmail('');
    } catch (err) {
      const error = err.response?.data?.error || 'Nepavyko pakeisti slaptažodžio';
      setMessage(error);
    }
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Pakeisti slaptažodį</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">El. paštas:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Senas slaptažodis:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Naujas slaptažodis:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Keisti
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-sm text-gray-600 hover:underline"
        >
          Atšaukti
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${message.includes('sėkmingai') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
