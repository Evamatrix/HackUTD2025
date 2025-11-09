// src/components/AuthMenu.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

// Small helpers
function prettify(s: string) {
  // turn "longvuwee" or "long.vu_wee" -> "Long Vuwee"
  return s.replace(/[._-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function getDisplayName(user?: any) {
  const raw = user?.name || user?.nickname || "";
  // If name looks like an email, ignore it and fall back to email's local part
  if (raw && !raw.includes("@")) return prettify(raw);

  const emailLocal = (user?.email || "").split("@")[0];
  return prettify(emailLocal || "User");
}

export default function AuthMenu() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div className="w-[150px] h-10 rounded-xl bg-white/20 animate-pulse" />;
  }

  const displayName = getDisplayName(user);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white">
        {user?.picture ? (
          <img src={user.picture} alt={displayName} className="w-7 h-7 rounded-full" />
        ) : (
          <UserIcon className="w-5 h-5" />
        )}
        <span className="max-w-[160px] truncate">{displayName}</span>
      </div>

      {/* NOTE: your original code had loginWithRedirect on the "Log out" button */}
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="px-4 py-2 rounded-xl border border-white/20 text-white flex items-center gap-2 transition-colors duration-200"
        style={{ borderWidth: "2px", backgroundColor: "rgba(0,0,0,0.15)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.15)")}
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </div>
  );
}
