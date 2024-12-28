/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KV_REST_API_URL: string;
  readonly VITE_KV_REST_API_TOKEN: string;
  readonly MODE: 'development' | 'production';
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
