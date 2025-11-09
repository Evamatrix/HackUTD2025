/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  // Add more vars here if you create them later
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
