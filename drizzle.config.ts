// import type {Config} from 'drizzle-kit'
// import * as dotenv from 'dotenv'

// dotenv.config({path: ".env"}) // Load environment variables from.env file

// export default {
//     driver: "expo",
//     schema: '.src/db/schema.ts',
//     dbCredentials: {
//         connectionString: process.env.DATABASE_URL!,
//     },
// } satisfies Config
import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: './drizzle',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})

//npx drizzle-kit push:pg
