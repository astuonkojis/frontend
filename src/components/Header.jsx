import { Link } from 'react-router-dom';
import { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';

export default function Header({ user, handleLogout }) {
  const [showChange, setShowChange] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <Link to="/" className="text-2xl font-bold text-blue-700 hover:underline">
          Eurovizijos spėlionė
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <button
                onClick={() => setShowChange(!showChange)}
                className="text-gray-700 font-medium hover:underline"
              >
                {user.first_name} {user.last_name}
              </button>
              <p className="text-sm text-gray-500 italic">{user.group_name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Atsijungti
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Prisijungti
            </button>
          </Link>
        )}
      </header>

      {showChange && (
        <ChangePasswordForm onClose={() => setShowChange(false)} />
      )}
    </>
  );
}
