// src/pages/Home.jsx

import { useEffect, useState } from 'react';
import CountriesList from '../components/CountriesList';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const getImage = () => {
    if (!user) return '/front/nr1.jpg';
    if (user.group_name === 'Kaimynai') return '/front/nr2.jpg';
    if (user.group_name === 'Draugai Vilnius') return '/front/nr3.jpg';
    return '/front/nr1.jpg';
  };

  return (
    <main className="p-4">
      <div className="flex justify-center mb-6">
        <img
          src={getImage()}
          alt="Grupės paveikslėlis"
          className="max-w-full rounded shadow"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Dalyvaujančios šalys</h2>
      <CountriesList />
    </main>
  );
}
