import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
  console.log("Auth0 Domain:", domain);
  console.log("Auth0 Client ID:", clientId);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: import.meta.env.VITE_AUTH0_API_AUDIENCE, // optional if you have a backend
      }}
    >
      {children}
    </Auth0Provider>
  );
};
