// src/pages/Login.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || 'https://spelione-backend.onrender.com';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError('');
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/');
        }
      })
      .catch(() => {
        setError('Serverio klaida');
      });
  };

  return (
    <main className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">Prisijungimas</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <input
          name="email"
          type="email"
          placeholder="El. paštas"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Slaptažodis"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Prisijungti
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Neturi paskyros?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Registruokis
        </Link>
      </p>

      <p className="mt-2 text-sm text-gray-600">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Pamiršau slaptažodį
        </Link>
      </p>
    </main>
  );
}
