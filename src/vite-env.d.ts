/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_FIREAPI: string,
    VITE_FIREDOMAIN: string,
    VITE_FIREDATABASE: string,
    VITE_FIREID: string,
    VITE_FIREBUCKET: string,
    VITE_FIRESENDER: string,
    VITE_FIREAPPID: string,
    VITE_FIREMEASUREMENT: string,

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

