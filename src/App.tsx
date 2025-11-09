import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Home from './Home';
import Landing from './auth/Landing';

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🌱</div>
          <p className="text-lg text-emerald-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing loginWithRedirect={loginWithRedirect} />;
  }

  return <Home />;
}