import {neon, neonConfig} from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
//neonConfig.fetchConnectionCache = true

const DATABASE_URL="postgresql://e-bonus_owner:npg_h9ViEmrye2JO@ep-odd-meadow-a5n48m7k-pooler.us-east-2.aws.neon.tech/e-bonus?sslmode=require"
// const DATABASE_URL="postgresql://jordybrian225:A7fNE0WmIvKy@ep-bold-water-69219359.us-east-2.aws.neon.tech/chatpdf-db?sslmode=require"

if(!DATABASE_URL)
{
    throw new Error ('database url not found')
}

const sql = neon(DATABASE_URL)

export const db = drizzle(sql)