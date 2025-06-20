import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../utils/colors';
import { useFonts } from "expo-font";
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import {AntDesign, Entypo} from '@expo/vector-icons';
import { generateCodeVerification, login, loginAgent } from '../services/OnlineRequest';
import { storeUserDatas } from '../services/AsyncStorage';

const Connexion = ({navigation}: any) => {

    const [loading, SetLoading] = useState(false)
    const [security, setSecurity] = useState(true)
    const [choixConnexion, setChoixConnexion] = useState("utilisateur")

    const [userData, SetUserData] = useState({
        login: '',
        password: ''
    })

    const [fontsLoaded] = useFonts({
        Bold : require("../assets/fonts/Poppins-Bold.ttf"),
        Regular : require("../assets/fonts/Poppins-Regular.ttf"),
        SemiBold : require("../assets/fonts/Poppins-SemiBold.ttf")
    })

    if(!fontsLoaded){
        return undefined
    }

    const handleLogin = async () => {
        if(userData.login == '' || userData.password == '')
        {
            alert('Veuillez saisir tous les champs');
            return
        }

        SetLoading(true)

        if(choixConnexion == 'utilisateur')
        {
            const regex = /^(07|05|01)[0-9]{8}$/
            if(regex.test(userData.login))
            {
                const res = await login(userData)
                if(res == false)
                {
                    alert('Utilisateur ou mot de passe incorrect');
                    SetLoading(false)
                    return
                }
        
                await storeUserDatas(res)
                if(res?.sta == 0)
                {
                    alert("Votre compte n'est pas vérifié, vous recevrez un code de confirmation afin de vérifier votre compte")
                    const code:any = await generateCodeVerification(res.numero)
                    if(code == true)
                    {
                        SetLoading(false)
                        navigation.navigate('Confirmation')
                    }
                    else
                    {
                        alert("Une erreur inattendu s'est produite merci de réessayer plus tard")
                        SetLoading(false)
                        return
                    }
                }
                else
                {
                    SetLoading(false)
                    navigation.navigate('Tabs')
                }
            }
            else
            {
                alert('Veuillez entrer un numéro de téléphone valide')
            }
        }
        else
        {
            const res = await loginAgent(userData)
            if(res == false)
            {
                alert('Utilisateur ou mot de passe incorrect');
                SetLoading(false)
                return
            }
    
            await storeUserDatas(res)

            navigation.navigate('LesPartenaires')
        }

    } 

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0} style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>

            <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Bold', fontSize: 30, color: "#000"}}>
                    <Text style={{fontFamily: 'Bold', fontSize: 30, color: colors.primary}}>e</Text>Bonus
                </Text>

                <Text style={{fontFamily: 'Regular', fontSize: 16, color: "#000", textAlign: 'center'}}>
                    Entrez vos identifiants pour accéder à votre compte
                </Text>
            </View>

            <View style={{marginTop: 25, flexDirection: 'row', alignItems: 'center', gap: 12}}>
                <TouchableOpacity style={{width: '45%', justifyContent: 'center', alignItems: 'center',padding: 13, borderRadius: 15, backgroundColor: choixConnexion == 'utilisateur' ? colors.primary : '#fff'}} onPress={() => setChoixConnexion('utilisateur')}>
                    <Text style={{fontFamily: 'Regular', fontSize: 16, color: choixConnexion == 'utilisateur' ? "#fff":"#000", textAlign: 'center'}}>Se connecter en tant qu'utilisateur</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '45%', justifyContent: 'center', alignItems: 'center', padding: 13, borderRadius: 15, backgroundColor: choixConnexion == 'agent' ? colors.primary : '#fff'}} onPress={() => setChoixConnexion('agent')}>
                    <Text style={{fontFamily: 'Regular', fontSize: 16, color: choixConnexion == 'agent' ? "#fff":"#000", textAlign: 'center'}}>Se connecter en tant qu'agent</Text>
                </TouchableOpacity>
            </View>

            <View style={{alignContent: 'flex-start', alignItems: 'flex-start', marginTop: 70, width: '100%', padding: 20}}>
                {choixConnexion == 'utilisateur' ? (
                    <View style={{width: '100%'}}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                            Numéro de téléphone
                        </Text>
                        <TextInput
                            placeholder="Entrez votre numéro de téléphone"
                            style={{borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, padding: 10, marginTop: 10}}
                            returnKeyType='next'
                            value={userData.login}
                            onChangeText={(e) => SetUserData({...userData, login:e})}
                            keyboardType='phone-pad'
                        />
                    </View>
                ): (
                    <View style={{width: '100%'}}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                            Nom d'utilisateur
                        </Text>
                        <TextInput
                            placeholder="Entrez votre nom d'utilisateur"
                            style={{borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, padding: 10, marginTop: 10}}
                            returnKeyType='next'
                            value={userData.login}
                            onChangeText={(e) => SetUserData({...userData, login:e})}
                            keyboardType='default'
                        />
                    </View>
                )}

                <View style={{width: '100%', marginTop: 20}}>
                    <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                        Mot de passe
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, }}>

                        <TextInput
                            placeholder="Entrez votre mot de passe"
                            style={{padding: 10, width: '85%'}}
                            returnKeyType='done'
                            secureTextEntry={security}
                            autoCapitalize='none'
                            autoComplete='off'
                            autoCorrect={false}
                            value={userData.password}
                            onChangeText={(e) => SetUserData({...userData, password:e})}
                        />

                        <TouchableOpacity onPress={() => setSecurity(!security)}>
                            <Entypo name={security ? "eye" : "eye-with-line"} size={24} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{width: '100%', marginTop: 20, padding: 20}}>
                <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                    <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: colors.Secondary}}>Mot de passe oublié ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', gap: 15, opacity: loading ? 0.5: 1}} disabled={loading} onPress={handleLogin}>
                    {loading && <ActivityIndicator size="small" color="#fff" /> }
                    <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#fff"}}>
                        Connexion
                    </Text>
                </TouchableOpacity>
            </View>

            {choixConnexion == 'utilisateur' && (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 130, width: '100%', gap: 10}}>
                    <Text style={{fontFamily: 'Regular', fontSize: 16, color: "#000"}}>
                        Pas encore de compte ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: colors.primary}}>
                            Inscrivez-vous</Text>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Connexion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});
