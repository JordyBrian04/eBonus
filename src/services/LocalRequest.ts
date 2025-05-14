import * as SQLite from 'expo-sqlite'
import { storeUserDatas } from './AsyncStorage';
import { generateCodeVerification } from './OnlineRequest';

const db = SQLite.openDatabaseAsync('local.db');

export const getAllLocalUser = async () => {
    const res:any = await (await db).getFirstAsync('SELECT * FROM user_ebonus')
    console.log(res)

    if(res)
    {
        //Si le compte de l'utilisateur n'est pas vérifié
        // if(res?.sta == 0)
        // {
        //     //await generateCodeVerification(res.numero)
        //     return 0
        // }

        // if(res?.sta == 1)
        // {
            await storeUserDatas(res);
            return res
        // }
    }
    else
    {
        return false
    }
}


export const insertUser =  async (data:any) => {
    try {
        console.log(data)
        // check if user already exists
        const existingUser = await (await db).getAllAsync("SELECT * FROM user_ebonus WHERE numero = ?", [data.numero])
        if (existingUser.length > 0) {
            return true;
        }

        if(data?.id === undefined) {
            console.log("Erreur id")
            return 'Erreur id';
        }

        // const result = await (await database).runAsync('INSERT INTO user (id, nom_complet, numero) VALUES (?, ?, ?)', data.id, data.nomcomplet, data.numero);
        const insert = await (await db).prepareAsync("INSERT INTO user_ebonus (id, nomcomplet, numero, sta, email, type_user, solde) VALUES (?, ?, ?, 0, ?, ?, ?)");
        await (await insert).executeAsync([data.id, data.nomcomplet, data.numero, data.email, data.type_user, data.solde])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const update_user = async (datas:any) => {
    try {
        console.log('-----update user------', datas)
        const update = (await db).runAsync('UPDATE user_ebonus SET email = ?, sta = ?, solde = ? WHERE numero = ?', [datas.email, datas.sta, datas.solde, datas.numero]);
        await getAllLocalUser()
        // console.log('update');
        return true
        //storeUserDatas(update)
    } catch (error) {
        return false
    }
}