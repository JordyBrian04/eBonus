import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { useFonts } from "expo-font";
import { useCameraPermissions } from 'expo-camera';
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { getUserDatas } from '../../services/AsyncStorage';
import { addEventListener } from "@react-native-community/netinfo";
import { getAllTransaction, getUserOnline } from '../../services/OnlineRequest';
import { update_user } from '../../services/LocalRequest';
import { useFocusEffect } from '@react-navigation/native';


const Home = ({navigation}: any) => {

    const [permission, requestPermission] = useCameraPermissions();
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [currentUser, setUser] = useState<any>([]);
    const [transactions, setTransactions] = useState<any>([]);
    const [solde, setSolde] = useState(0)
    const [refresh, setRefreshing] = useState(false);

    const fetchUserData = async () => {
        const userData = await getUserDatas();
        console.log(userData)
        setUser(userData);
        setSolde(userData?.solde || 0);
    };

    const fetchTransaction = async () => {
        const datas:any = await getAllTransaction()
        console.log(datas)
        setTransactions(datas)
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchUserData();
            fetchTransaction()
        }, [])
    )
    // useEffect(() => {
    //     fetchUserData();
    // }, []);



    const handlePermission = () => {
        requestPermission()
        if(permission?.granted)
        {
            navigation.navigate("Scanner");
        }
    }

        // Vérification de la connexion à Internet
        useEffect(() => {
            let interval: NodeJS.Timeout;
            
            const handleConnectionChange = (state: any) => {
                // console.log("Connection", state);
                setIsConnected(state.isConnected);
                // console.log("Is connected?", state.isConnected);
            };

            const unsubscribe = addEventListener(handleConnectionChange);
    
            const checkConnection = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
    
                if (isConnected && currentUser?.numero) {
                    const res: any = await getUserOnline();
                    // console.log('------get user online----------', res)
                    if(res && res[0])
                    {
                        if(parseInt(res[0]?.solde) !== parseInt(currentUser?.solde))
                        {
                            console.log('------solde different ----------', parseInt(res[0]?.solde), parseInt(currentUser?.solde))
                            await update_user(res[0]);
                            // Mise à jour unique des données
                            const updatedUserData = await getUserDatas();
                            console.log('------maj unique----------', updatedUserData)
                            setUser(updatedUserData);
                            setSolde(parseInt(updatedUserData?.solde || 0));
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to get network status:", error);
                setIsConnected(false);
            }
            };
    
            const startChecking = () => {
                checkConnection(); // Appel initial
                interval = setInterval(checkConnection, 1000); // Vérification périodique
            };
    
            startChecking();
    
            return () => clearInterval(interval); // Nettoyage
        }, [currentUser]);

        const refreshing = () => {
            setRefreshing(true);
        
            fetchUserData();
        
            setTimeout(() => {
                setRefreshing(false);
            }, 2000);
        };

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            
            // Récupération des composants de la date
            const jour = date.getDate().toString().padStart(2, '0');
            const mois = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 car les mois commencent à 0
            const annee = date.getFullYear();
            const heures = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const secondes = date.getSeconds().toString().padStart(2, '0');
        
            // Construction de la chaîne formatée
            return `${jour}/${mois}/${annee} à ${heures}:${minutes}:${secondes}`;
        }

        const [fontsLoaded] = useFonts({
            Bold : require("../../assets/fonts/Poppins-Bold.ttf"),
            Regular : require("../../assets/fonts/Poppins-Regular.ttf"),
            SemiBold : require("../../assets/fonts/Poppins-SemiBold.ttf"),
            ExtraLight : require("../../assets/fonts/Poppins-ExtraLight.ttf"),
            Light : require("../../assets/fonts/Poppins-Light.ttf"),
        })
    
        if(!fontsLoaded){
            return undefined
        }

  return (
    <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
        <View style={{backgroundColor: colors.primary, width: '100%', padding: 20}}>
            <View style={{marginTop: Platform.OS == 'ios' ? 30 : 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{color: "#fff", fontFamily: 'Light'}}>Bonjour</Text>
                    <Text style={{color: "#fff", fontFamily: 'Bold', fontSize: 20}}>{currentUser.nomcomplet}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("InformationUser")}>
                    <Image source={require("../../assets/images/user.png")} style={{width: 40, height: 40}} />
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: "#fff", fontFamily: 'Bold', fontSize: 40}}>{solde.toLocaleString('fr-FR')}</Text>
                <Text style={{color: "#fff", fontFamily: 'Light'}}>
                    <Text style={{color: "#fff", fontFamily: 'Bold'}}>e</Text>
                    Bonus
                </Text>
            </View>
        </View>
        <ScrollView style={{flex:1, backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20}}                     refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={refreshing} />
                    }>
            <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: colors.primary, padding: 15, borderRadius: 10}} onPress={handlePermission}>
                    <Text style={{color: "#fff", fontFamily: 'SemiBold'}}>Scanner pour payer</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10, padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'SemiBold'}}>Historique des transaction</Text>
                    <TouchableOpacity>
                        <Text style={{color: colors.primary, fontFamily: 'Regular'}}>Voir tout</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'column', gap: 20, marginTop: 15}}>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((item: any, index: number) => (

                            <TouchableOpacity key={index} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{padding: 10, backgroundColor: colors.primary, borderRadius: 15}}>
                                        {item.type_transaction === 'credit' ? (
                                            <Image 
                                                source={require('../../assets/images/credit.png')} 
                                                tintColor={colors.background}
                                                style={{width: 40, height: 40, resizeMode: 'contain'}} 
                                            />
                                        ) : (
                                            <Image 
                                                source={require('../../assets/images/debit.png')} 
                                                tintColor={colors.background}
                                                style={{width: 40, height: 40, resizeMode: 'contain'}} 
                                            />
                                        )}
                                    </View>
                                    <View style={{width: '80%'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <Text style={{fontFamily: 'SemiBold'}} numberOfLines={2}>Achat à {item.nomPartenaire} - {item.adressePartenaire}</Text>
                                            <Text style={{fontFamily: 'Regular', color: item.type_transaction == 'credit' ? 'green':'red'}}>{item.montant.toLocaleString('fr-FR')} e</Text>
                                        </View>
                                        <Text>{formatDate(item.date)}</Text>
                                    </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View>
                            <Text>Aucune transaction</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  }
});
