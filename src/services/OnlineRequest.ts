import { and, eq, asc, desc } from "drizzle-orm"
import { db } from "../db"
import { les_agents, les_partenaires, temp, utilisateur, transaction, admin_user } from "../db/schema"
import { insertUser } from "./LocalRequest";
import { getNumCompte, getUserDatas, storeUserDatas } from "./AsyncStorage";

export const generateCodeVerification = async (numero: any) => {
    const date = new Date();
    const code = Math.floor(10000+Math.random() * 90000);
    date.setMinutes(date.getMinutes() + 2);
    const formattedDate = date;

    const insert_temps:any = await db.insert(temp).values({
        compte: numero,
        code_verification: code,
        date_expiration: formattedDate
    })

    if(insert_temps)
    {
        return true
    }
    else
    {
        return false
    }
}

export const login = async (data: any) => {
    try {
        const req = await db.select().from(utilisateur).where(and(eq(utilisateur.numero, data.login), eq(utilisateur.mdp, data.password)));
        if(req.length > 0)
        {
            let datas = [
                {id: req[0].id, nomcomplet: req[0].nomcomplet, numero: req[0].numero, sta: 1, email: req[0].email, type_user: 'utilisateur', solde: req[0].solde}
            ]

            const res = await insertUser(datas[0])
            return req[0];
        }
        else
        {
            return false
        }
    } catch (error) {
        
    }
}

export const loginAgent = async (data:any) => {
    try {
        const req = await db.select().from(admin_user).where(and(eq(admin_user.user_login, data.login), eq(admin_user.mdp, data.password)));
        if(req.length > 0)
        {
            let datas = [
                {id: req[0].id, nomcomplet: req[0].user_login, numero: req[0].user_login, sta: 1, email: req[0].user_login, type_user: 'agent', solde: 0}
            ]

            const res = await insertUser(datas[0])
            return req[0];
        }
        else
        {
            return false
        }
    } catch (error) {
        
    }
}

export const signin = async (data: any) => {

    try {
        const verif = await db.select().from(utilisateur).where(eq(utilisateur.numero, data.numero));

        if(verif.length > 0)
        {
            return -1
        }
    
        const insert = await db.insert(utilisateur).values({
            nomcomplet: data.nomcomplet,
            numero: data.numero,
            mdp: data.password,
            email: data.email,
            sta: 0
        }).returning({id: utilisateur.id})
    
        let datas = [
            {id: insert[0].id, nomcomplet: data.nomcomplet, numero: data.numero, sta: 1, email: data.email}
        ]
    
        if(insert)
        {
            // const res = await insertUser(datas[0])
    
            // if(res === true)
            // {
                await generateCodeVerification(data.numero)
                await storeUserDatas(datas[0])
                return insert[0]
            // }
        }
    } catch (error) {
        console.error(error)
        return "Erreur du serveur, verifiez votre connexion"
    }


}

export const verifyCode = async (req: any) => {
    try {
        const user:any = await getUserDatas();
        console.log('user', user)
        const data = await db.select().from(temp).where(eq(temp.compte, user.numero)).orderBy(desc(temp.id)).limit(1)
        // console.log(data, user)
        if(data.length > 0)
        {
            return data
        }
        else
        {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const resendCode = async () => {
    try {
        const user:any = await getUserDatas();
        const res = await generateCodeVerification(user.numero)
        if(res === true)
        {
            return true
        }
        else
        {
            return false
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const updateUserSta = async () => {
    try {
        const user:any = await getUserDatas();
        console.log('usr', user.id)
        const res:any = await db.update(utilisateur).set({sta: 1}).where(eq(utilisateur.id, user.id))
        console.log('after update', res)

        if(res)
        {
            await insertUser(user)
            return true
        }
        else
        {
            return false
        }
        
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getUserOnline = async () => {
    try {
        const user:any = await getUserDatas();
        const data = await db.select().from(utilisateur).where(eq(utilisateur.numero, user.numero))
        // console.log(data)
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export const verifCode = async (code:any) => {

    try {
        // const req:any = await db.select().from(les_agents).where(eq(les_agents.code, code))
        const req:any = await db.select().from(les_partenaires).where(eq(les_partenaires.code, code))

        if(req.length > 0)
        {
            return true
        }
        else
        {
            return false
        }
    } catch (error) {
        console.error(error)
        return 0
    }

}

// export const getAgentData = async (code:any) => {
//     const res:any = await db.select({
//         nomAgent: les_agents.nom,
//         nomPartenaire: les_partenaires.nom,
//         adressePartenaire: les_partenaires.adresse,
//         remisePartenaire: les_partenaires.remise,
//         typePartenaire: les_partenaires.type_partenaire,
//         codePartenaire: les_partenaires.code
//     }).from(les_agents)
//     .innerJoin(les_partenaires, eq(les_agents.code_partenaire, les_partenaires.code))
//     // .where(and(eq(les_agents.code_partenaire, code),eq(les_agents.mdp, pass)))
//     .where(eq(les_agents.code_partenaire, code))

//     return res[0]
// }

export const getAgentData = async (code:any) => {
    const res:any = await db.select({
        nomPartenaire: les_partenaires.nom,
        adressePartenaire: les_partenaires.adresse,
        remisePartenaire: les_partenaires.remise,
        typePartenaire: les_partenaires.type_partenaire,
        codePartenaire: les_partenaires.code
    }).from(les_partenaires)
    // .innerJoin(les_partenaires, eq(les_agents.code_partenaire, les_partenaires.code))
    // .where(and(eq(les_agents.code_partenaire, code),eq(les_agents.mdp, pass)))
    .where(eq(les_partenaires.code, code))

    return res[0]
}

export const insertTransaction = async (req:any) => {
    const user:any = await getAgentData(req.codeAgent)
    const current_user = await getUserDatas()

    // console.log(user, current_user)

    try {
        //On vérifie si le code de l'agent est bon
        // const verifCode:any = await db.select().from(les_agents).where(and(eq(les_agents.code,req.codeAgent), eq(les_agents.mdp, req.code)))
        const verifCode:any = await db.select().from(les_agents).where(and(eq(les_agents.code_partenaire,req.codeAgent), eq(les_agents.mdp, req.code)))
        console.log(verifCode)
        if(verifCode.length <= 0)
        {
            return -1
        }

        if(user.typePartenaire == 'magasin')
        {
            const montantPrelever = req.montant*(user.remisePartenaire/100)
            
            //On vérifie le solde de l'utilisateur
            const verifSolde:any = await db.select().from(utilisateur).where(eq(utilisateur.numero, current_user.numero))

            if(verifSolde[0].solde < montantPrelever)
            {
                return -100
            }

            //On debite le solde de l'utilisateur
            const nouveauSolde = parseInt(verifSolde[0].solde) - montantPrelever
            const update:any = await db.update(utilisateur).set({solde: nouveauSolde}).where(eq(utilisateur.id, current_user.id))

            //On ajoute dans la table transaction
            //Générer un numero de transaction
            const date = new Date();
            const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
            const seconds = date.getSeconds().toString().padStart(2, '0'); // SS (deux chiffres)
            const result = formattedDate + seconds;
            const randomPart = Math.random().toString(16).substr(2, 8).toUpperCase();
            const numero_transaction = `TXN-${result}-${randomPart}`

            const insert:any = await db.insert(transaction).values({
                numero_transaction: numero_transaction,
                utilisateur: current_user.numero,
                type_transaction: 'debit',
                partenaire: user.codePartenaire,
                agent: verifCode[0].nom,
                montant: montantPrelever,
                montant_achat: req.montant,
                montant_espece: req.montant-montantPrelever
            }).returning({id: transaction.id})
        }

        if(user.typePartenaire == 'station')
        {
            const montantAjouter = req.montant*(user.remisePartenaire/100)
            
            //On vérifie le solde de l'utilisateur
            const verifSolde:any = await db.select().from(utilisateur).where(eq(utilisateur.numero, current_user.numero))

            //On debite le solde de l'utilisateur
            const nouveauSolde = parseInt(verifSolde[0].solde) + montantAjouter
            const update:any = await db.update(utilisateur).set({solde: nouveauSolde}).where(eq(utilisateur.id, current_user.id))

            //On ajoute dans la table transaction
            //Générer un numero de transaction
            const date = new Date();
            const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
            const seconds = date.getSeconds().toString().padStart(2, '0'); // SS (deux chiffres)
            const result = formattedDate + seconds;
            const randomPart = Math.random().toString(16).substr(2, 8).toUpperCase();
            const numero_transaction = `TXN-${result}-${randomPart}`

            const insert:any = await db.insert(transaction).values({
                numero_transaction: numero_transaction,
                utilisateur: current_user.numero,
                type_transaction: 'credit',
                partenaire: user.codePartenaire,
                agent: verifCode[0].nom,
                // agent: user.nomAgent,
                montant: montantAjouter,
                montant_achat: req.montant,
                montant_espece: req.montant-montantAjouter
            }).returning({id: transaction.id})
        }

        return 200
    } catch (error) {
        console.error(error)
        return 0
    }

    
}

export const getAllTransaction = async () => {
    const user:any = await getUserDatas();
    const data:any = await db.select({
        idTransaction: transaction.id,
        nomPartenaire: les_partenaires.nom,
        adressePartenaire: les_partenaires.adresse,
        type_transaction: transaction.type_transaction,
        date: transaction.cree_le,
        montant: transaction.montant
    }).from(transaction)
    .innerJoin(les_partenaires, eq(les_partenaires.code, transaction.partenaire))
    .where(eq(transaction.utilisateur, user.numero))
    .orderBy(desc(transaction.cree_le))
    return data
}

export const getAllStation = async () => {
    const data:any = await db.select().from(les_partenaires).where(eq(les_partenaires.type_partenaire, "station")).orderBy(desc(les_partenaires.cree_le));
    return data
}

export const getAllPartenaire = async () => {
    const data:any = await db.select().from(les_partenaires).where(eq(les_partenaires.type_partenaire, "magasin")).orderBy(desc(les_partenaires.cree_le));
    return data
}

export const getAll = async () => {
    const data:any = await db.select().from(les_partenaires).orderBy(desc(les_partenaires.cree_le));
    return data
}