// src/components/CountriesList.jsx

import React from 'react';

const countries = [
  { name: 'Albanija', code: 'al' },
  { name: 'Azerbaidžanas', code: 'az' },
  { name: 'Belgija', code: 'be' },
  { name: 'Kroatija', code: 'hr' },
  { name: 'Kipras', code: 'cy' },
  { name: 'Estija', code: 'ee' },
  { name: 'Islandija', code: 'is' },
  { name: 'Nyderlandai', code: 'nl' },
  { name: 'Norvegija', code: 'no' },
  { name: 'Lenkija', code: 'pl' },
  { name: 'Portugalija', code: 'pt' },
  { name: 'San Marinas', code: 'sm' },
  { name: 'Slovėnija', code: 'si' },
  { name: 'Švedija', code: 'se' },
  { name: 'Ukraina', code: 'ua' },
  { name: 'Armėnija', code: 'am' },
  { name: 'Australija', code: 'au' },
  { name: 'Austrija', code: 'at' },
  { name: 'Čekija', code: 'cz' },
  { name: 'Danija', code: 'dk' },
  { name: 'Suomija', code: 'fi' },
  { name: 'Gruzija', code: 'ge' },
  { name: 'Graikija', code: 'gr' },
  { name: 'Airija', code: 'ie' },
  { name: 'Izraelis', code: 'il' },
  { name: 'Latvija', code: 'lv' },
  { name: 'Lietuva', code: 'lt' },
  { name: 'Liuksemburgas', code: 'lu' },
  { name: 'Malta', code: 'mt' },
  { name: 'Juodkalnija', code: 'me' },
  { name: 'Serbija', code: 'rs' },
  { name: 'Prancūzija', code: 'fr' },
  { name: 'Vokietija', code: 'de' },
  { name: 'Italija', code: 'it' },
  { name: 'Ispanija', code: 'es' },
  { name: 'Šveicarija', code: 'ch' },
  { name: 'Jungtinė Karalystė', code: 'gb' }
];

const CountriesList = () => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {countries.map((country) => (
        <div key={country.code} className="flex items-center space-x-2 bg-white p-2 rounded shadow">
          <img
            src={`/flags/${country.code}.png`}
            alt={country.name}
            className="w-8 h-5 object-cover border"
          />
          <span className="text-sm font-medium">{country.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
