/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_FIREAPI: string,
    readonly VITE_FIREDOMAIN: string,
    readonly VITE_FIREDATABASE: string,
    readonly VITE_FIREID: string,
    readonly VITE_FIREBUCKET: string,
    readonly VITE_FIRESENDER: string,
    readonly VITE_FIREAPPID: string,
    readonly VITE_FIREMEASUREMENT: string,

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

