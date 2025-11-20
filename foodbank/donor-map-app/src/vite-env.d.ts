/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string
  readonly VITE_KAKAO_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Kakao Maps API type declarations
declare global {
  interface Window {
    kakao: any;
  }
}
