/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API: string;
  // add other env vars here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}