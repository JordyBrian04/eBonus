
import {pgTable, text, serial, timestamp, real, integer, date} from 'drizzle-orm/pg-core'

export const utilisateur = pgTable('utilisateur', {
    id: serial('id').primaryKey(),
    nomcomplet: text('nomcomplet').notNull(),
    numero: text('numero').unique().notNull(),
    email: text('email').notNull(),
    mdp: text('mdp').notNull(),
    type_utilisateur: text('type_utilisateur').notNull().default('utilisateur'),
    sta: integer('sta').default(0),
    solde: integer('solde').default(0),
    cree_le: timestamp('cree_le').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const admin_user = pgTable('admin_user', {
    id: serial('id').primaryKey(),
    user_login: text('user_login').notNull(),
    mdp: text('mdp').notNull()
})


export const les_partenaires = pgTable('les_partenaires', {
    id: serial('id').primaryKey(),
    code: text('code').unique().notNull(),
    logo: text('logo').default(''),
    nom: text('nom').notNull(),
    email: text('email').notNull().default(''),
    adresse: text('adresse').notNull(),
    remise: real('remise').default(0),
    type_partenaire: text('type_partenaire').notNull(),
    pass: text('pass').default(""),
    cree_le: timestamp('cree_le').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// export const station_service = pgTable('station_service', {
//     id: serial('id').primaryKey(),
//     code: text('code').unique().notNull(),
//     nom: text('nom').notNull(),
//     adresse: text('adresse').notNull(),
//     logo: text('logo').default(''),
//     remise: real('remise').default(0),
//     cree_le: timestamp('cree_le').notNull().defaultNow(),
//     updatedAt: timestamp('updatedAt').notNull().defaultNow(),
// })

export const les_agents = pgTable('les_agents', {
    id: serial('id').primaryKey(),
    code: text('code').unique().notNull(),
    nom: text('nom').notNull(),
    numero: text('numero').unique().notNull(),
    mdp: text('mdp').notNull(),
    code_partenaire: text('code_partenaire').notNull(),
    cree_le: timestamp('cree_le').notNull().defaultNow(),
})

export const temp = pgTable('temp', {
    id: serial('id').primaryKey(),
    compte: text('numero').notNull(),
    code_verification: integer('code_verification').default(0).notNull(),
    date_expiration: timestamp('date_expiration').notNull()
})


export const transaction = pgTable('transaction', {
    id: serial('id').primaryKey(),
    numero_transaction: text('numero_transaction').notNull().unique(),
    utilisateur: text('utilisateur').references(() => utilisateur.numero).notNull(),
    type_transaction: text('type_transaction').notNull(),
    partenaire: text('partenaire').notNull(),
    agent: text('agent').notNull(),
    montant_achat: real('montant_achat').notNull(),
    montant_espece: real('montant_espece').notNull(),
    montant: real('montant').notNull(),
    cree_le: timestamp('cree_le').notNull().defaultNow(),
})

//npx drizzle-kit push
//npx drizzle-kit generate
//npx drizzle-kit studio