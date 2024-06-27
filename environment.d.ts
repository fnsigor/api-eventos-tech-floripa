declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "production" | "development";
            PORT: string;
            DATABASE_URL: string,
            MAILERSEND_TOKEN: string,
            JWT_SECRET_KEY: string
        }
    }
}

export { };