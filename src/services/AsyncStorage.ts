import AsyncStorage from "@react-native-async-storage/async-storage";
import  {db} from '../db'
import { utilisateur, temp } from '../db/schema';
import { eq, sql, and, count } from 'drizzle-orm';

export const storeNumCompte = async (course: any) => {
  try {
    //console.log('course', course);
    await AsyncStorage.setItem("num_compte", JSON.stringify(course));
  } catch (error) {
    console.log("[storeNumCompte] error", error);
  }
};

export const storeUserDatas = async (course: any) => {
  try {
    //console.log('course', course);
    await AsyncStorage.setItem("user", JSON.stringify(course));
  } catch (error) {
    console.log("[storeUserDatas] error", error);
  }
};

export const getUserDatas = async () => {
  try {
    let userData = await AsyncStorage.getItem("user");
    const data = JSON.parse(userData as string);
    return data;
  } catch (error) {}
};

export const getNumCompte = async () => {
  try {
    let userData = await AsyncStorage.getItem("num_compte");
    const data = JSON.parse(userData as string);
    return data;
  } catch (error) {}
};

// export const getUser = async (isConnected:boolean) => {
//   try {
//     let userData:any
//     if (isConnected) {
//       userData = db.select().from(utilisateur)
//     } else {
//       return null;
//     }
//     // let userData = await AsyncStorage.getItem("user");
//     const data = JSON.parse(userData as string);
//     return data;
//   } catch (error) {}
// };
