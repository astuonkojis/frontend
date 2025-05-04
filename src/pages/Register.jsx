// src/pages/Register.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Register() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL; // ✅ API iš aplinkos

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    code: '',
  });
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'code') {
      setGroupName('');
      setError('');

      if (value.trim().length > 0) {
        try {
          const res = await fetch(`${API}/api/check-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: value }),
          });

          const data = await res.json();

          if (data.group_name) {
            setGroupName(data.group_name);
          } else if (data.error) {
            setError(data.error);
          }
        } catch {
          setError('Nepavyko susisiekti su serveriu');
        }
      }
    }
  };

  const handleCaptchaChange = (token) => {
    console.log("Gautas captcha token:", token);
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName) {
      setError('Neteisingas ar nepriskirtas kodas');
      return;
    }

    if (!captchaToken) {
      setError('Pažymėkite „Aš ne robotas“');
      return;
    }

    try {
      const verifyRes = await fetch(`${API}/api/verify-captcha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setError('Nepavyko patvirtinti „Aš ne robotas“. Bandykite dar kartą.');
        return;
      }
    } catch {
      setError('Serverio klaida tikrinant reCAPTCHA');
      return;
    }

    const formWithGroup = { ...form, group_name: groupName };

    try {
      const res = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formWithGroup),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        navigate('/login');
      }
    } catch {
      setError('Nepavyko susisiekti su serveriu');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">Registracija</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <input name="name" type="text" placeholder="Vardas" className="w-full p-2 border rounded" value={form.name} onChange={handleChange} />
        <input name="surname" type="text" placeholder="Pavardė" className="w-full p-2 border rounded" value={form.surname} onChange={handleChange} />
        <input name="email" type="email" placeholder="El. paštas" className="w-full p-2 border rounded" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Slaptažodis" className="w-full p-2 border rounded" value={form.password} onChange={handleChange} />
        <input name="code" type="text" placeholder="Grupės kodas" className="w-full p-2 border rounded" value={form.code} onChange={handleChange} />

        {groupName && (
          <p className="text-sm text-green-700 italic">Jūs būsite priskirtas grupei: <strong>{groupName}</strong></p>
        )}

        <ReCAPTCHA
          sitekey="6LexLC0rAAAAAIOzgSQVTd_KzurvHd45bdqMvmKM"
          onChange={handleCaptchaChange}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Registruotis
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Jau turi paskyrą?{' '}
        <Link to="/login" className="text-green-600 hover:underline">
          Prisijunk
        </Link>
      </p>
    </main>
  );
}
