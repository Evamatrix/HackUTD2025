// src/components/AuthMenu.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

export default function AuthMenu() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    // Avoid layout shift while Auth0 initializes
    return (
      <div className="w-[150px] h-10 rounded-xl bg-white/20 animate-pulse" />
    );
  }
  // Authenticated UI
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white">
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user?.name || "User avatar"}
            className="w-7 h-7 rounded-full"
          />
        ) : (
          <UserIcon className="w-5 h-5" />
        )}
        <span className="max-w-[160px] truncate">{user?.name || user?.email}</span>
      </div>
      <button
  onClick={() => loginWithRedirect()}
  className="px-4 py-2 rounded-xl border border-white/20 text-white flex items-center gap-2 transition-colors duration-200"
  style={{
    borderWidth: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.15)')
  }
>
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </div>
  );
}
