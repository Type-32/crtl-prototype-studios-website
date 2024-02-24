/// <reference types="vite/client" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_CMS_URL: string;
            VITE_CMS_TOKEN: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}