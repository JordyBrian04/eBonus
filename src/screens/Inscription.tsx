import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import { useFonts } from "expo-font";
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import {AntDesign, Entypo} from '@expo/vector-icons';
import { signin } from '../services/OnlineRequest';

const Inscription = ({navigation}: any) => {

    const [loading, SetLoading] = useState(false)
    const [security, setSecurity] = useState(true)
    const [conf_security, setConfSecurity] = useState(true)

    const [userData, SetUserData] = useState({
        nomcomplet: '',
        numero: '',
        email: '',
        password: '',
        conf_password: ''
    })

    const handleInscription = async () => {
        SetLoading(true)

        if(userData.nomcomplet != '' && userData.numero != '' && userData.password != '' && userData.conf_password != '')
        {
            const regex = /^(07|05|01)[0-9]{8}$/
            if(regex.test(userData.numero))
            {
                if(userData.conf_password !== userData.password)
                {
                    alert('Veuillez entrer des mots de passe identiques')
                    SetLoading(false)
                    return
                }

                const res:any = await signin(userData)

                if(res?.id)
                {
                    navigation.navigate('Confirmation')
                    SetLoading(false)
                }
                else if(res == -1)
                {
                    alert('Ce numéro est déjà associé à un compte veuillez vous connecter')
                    SetLoading(false)
                }
                else
                {
                    alert(res)
                    SetLoading(false)
                }
            }
            else
            {
                alert('Veuillez entrer un numéro valide')
                SetLoading(false)
            }
        }
        else
        {
            alert('Veuillez saisir tous les champs')
            SetLoading(false)
        }
        
    }

    const [fontsLoaded] = useFonts({
        Bold : require("../assets/fonts/Poppins-Bold.ttf"),
        Regular : require("../assets/fonts/Poppins-Regular.ttf"),
        SemiBold : require("../assets/fonts/Poppins-SemiBold.ttf")
    })

    if(!fontsLoaded){
        return undefined
    }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0} style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>

                <View style={{alignItems: 'center', marginTop: 20, padding: 20}}>
                    <Text style={{fontFamily: 'Bold', fontSize: 30, color: "#000"}}>
                        <Text style={{fontFamily: 'Bold', fontSize: 30, color: colors.primary}}>e</Text>Bonus
                    </Text>

                    <Text style={{fontFamily: 'Regular', fontSize: 16, color: "#000", textAlign: 'center'}}>
                        Entrez vos informations pour créer un compte
                    </Text>
                </View>

                <View style={{alignContent: 'flex-start', alignItems: 'flex-start', marginTop: 50, width: '100%', padding: 20}}>
                    <View style={{width: '100%'}}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                            Nom complet
                        </Text>
                        <TextInput
                            placeholder="Entrez votre nom complet"
                            style={{borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, padding: 10, marginTop: 10}}
                            returnKeyType='next'
                            value={userData.nomcomplet}
                            onChangeText={(e) => SetUserData({...userData, nomcomplet:e})}
                            autoCapitalize='words'
                        />
                    </View>
                    <View style={{width: '100%', marginTop: 20}}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                            Numéro de téléphone
                        </Text>
                        <TextInput
                            placeholder="Entrez votre numéro de téléphone"
                            style={{borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, padding: 10, marginTop: 10}}
                            returnKeyType='next'
                            value={userData.numero}
                            onChangeText={(e) => SetUserData({...userData, numero:e})}
                            keyboardType='phone-pad'
                        />
                    </View>
                    <View style={{width: '100%', marginTop: 20}}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                            Email
                        </Text>
                        <TextInput
                            placeholder="Entrez votre email"
                            style={{borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, padding: 10, marginTop: 10}}
                            returnKeyType='next'
                            value={userData.email}
                            onChangeText={(e) => SetUserData({...userData, email:e})}
                        />
                    </View>
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
                    <View style={{width: '100%', marginTop: 20}}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                            Confirmer mot de passe
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10, }}>

                            <TextInput
                                placeholder="Confirmez votre mot de passe"
                                style={{padding: 10, width: '85%'}}
                                returnKeyType='done'
                                secureTextEntry={conf_security}
                                autoCapitalize='none'
                                autoComplete='off'
                                autoCorrect={false}
                                value={userData.conf_password}
                                onChangeText={(e) => SetUserData({...userData, conf_password:e})}
                            />

                            <TouchableOpacity onPress={() => setConfSecurity(!conf_security)}>
                                <Entypo name={conf_security ? "eye" : "eye-with-line"} size={24} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{width: '100%', marginTop: 20, padding: 20}}>
                    <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', gap: 15}} disabled={loading} onPress={handleInscription}>
                        {loading && <ActivityIndicator size="small" color="#fff" /> }
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#fff"}}>
                            Suivant
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 100, width: '100%', gap: 10, padding: 20}}>
                    <Text style={{fontFamily: 'Regular', fontSize: 16, color: "#000"}}>
                        Vous avez un compte ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: colors.primary}}>
                            Connectez-vous</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Inscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});
