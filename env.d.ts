/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_CMS_URL: string;
    readonly VITE_CMS_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}