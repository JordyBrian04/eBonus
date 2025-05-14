import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { OtpInput } from "react-native-otp-entry";
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { colors } from '../utils/colors';
import { resendCode, updateUserSta, verifyCode } from '../services/OnlineRequest';
import { cosineDistance } from 'drizzle-orm';
import { getUserDatas } from '../services/AsyncStorage';

const Confirmation = ({navigation}:any) => {

    // const userData = getUserDatas()

    const [code, setCode] = React.useState('');
    const [numero, setNumero] = React.useState('');
    const [loading, setLoading] = React.useState(false)
    const [minutes, setMinutes] = React.useState(2)
    const [seconds, setSeconds] = React.useState(0);
    const [stopTimer, setStopTimer] = React.useState(false);

    const handleCode = (text:any) => {
        setCode(text);
    }


    const getUser = async () => {
        const res:any = await getUserDatas()
        setNumero(res[0].numero)
    }


    React.useEffect(() => {
        getUser()
        if (stopTimer) return;
    
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else if (minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    return 59;
                } else {
                    clearInterval(interval);
                    setStopTimer(true);
                    return 0;
                }
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, [minutes, stopTimer]);

    const handleConfirm = async () => {
        setLoading(true)
        // navigation.navigate("Tabs")
        const res:any = await verifyCode({code: code})
        // console.log('res', res,' code ', code)

        if(res[0].code_verification != code)
        {
            alert('Code de vérification incorrect')
            setLoading(false)
            return
        }
        // if(res.length > 0)
        //     {
        if(res[0].date_expiration < new Date())
        {
            setLoading(false)
            alert('Le code de vérification à expiré veuillez demander un autre code.')
        }
        else
        {
            const up:any = await updateUserSta()
            console.log('updtae',up)
            if(up == true)
            {
                navigation.navigate('Tabs')
            }
            else
            {
                alert("Une erreur s'est produite")
            }
            setLoading(false)
        }
        //     }
        //     else
        //     {
        //         setLoading(false)
        //         alert('Le code de vérification est incorrect, veuillez réessayer.')
        //     }
    }

    const handleResendCode = async () => {
        // Alert.alert(
        //     "Renvoyer le code",
        //     `Le numéro ${numero} est-il correcte ?`,
        //     [
        //         {
        //             text: "Non, modifier",
        //             // style: "cancel",
        //             onPress: async () => {
        //                 navigation.navigate("Inscription")
        //             }
        //         },
        //         {
        //             text: "Oui",
        //             onPress: async () => {
        //                 setLoading(true)

        //                 //On enregistre les infos de l'utilisateur après vérification
        //                 const res:any = await resendCode()
        //                 console.log('res', res)
        //                 if(res === true)
        //                 {
        //                     setLoading(false)
        //                     setStopTimer(false)
        //                     setMinutes(2)
        //                     alert('Un code a été envoyé à votre téléphone.')
        //                 }
        //                 else
        //                 {       
        //                     setLoading(false)
        //                     alert('Une erreur est survenue, veuillez réessayer.')
        //                 }
        //             }
        //         }
        //     ]
        // )
        setLoading(true)

        //On enregistre les infos de l'utilisateur après vérification
        const res:any = await resendCode()
        console.log('res', res)
        if(res === true)
        {
            setLoading(false)
            setStopTimer(false)
            setMinutes(2)
            alert('Un code a été envoyé à votre téléphone.')
        }
        else
        {       
            setLoading(false)
            alert('Une erreur est survenue, veuillez réessayer.')
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
        <StatusBar backgroundColor={colors.background} barStyle='dark-content' />
        <View style={{padding: 20, alignItems: 'flex-start'}}>
            <TouchableOpacity onPress={() => [setLoading(false),navigation.goBack()]}>
                <AntDesign name="arrowleft" size={35} color="black" />
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.box} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 40 }}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0}>
                <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center',justifyContent: 'center', padding: 20}}>
                    <Text style={{fontSize: 25, fontFamily: 'Bold', color: colors.primary}}>CONFIRMATION</Text>
                    <Text style={{fontWeight: 400, fontSize: 18, color: '#000', marginTop: 40, fontFamily: 'Regular'}}>Un code à 5 chiffres a été envoyé </Text>
                    <Text style={{fontSize: 16, color: '#000', textAlign: 'center', fontWeight: 400, fontFamily: 'Regular'}}>Vérifiez votre téléphone et entrez le code ici.</Text>

                    <View style={{marginTop: 20, padding: 20}}>
                        
                            <OtpInput 
                                numberOfDigits={5} 
                                autoFocus={false}
                                onTextChange={(text:any) => handleCode(text)} 
                                focusStickBlinkingDuration={400}
                                theme={{
                                    pinCodeContainerStyle: {
                                        width: 58,
                                        height: 58,
                                        borderWidth: 1,
                                        borderColor: colors.primary,
                                        borderRadius: 12,
                                        margin: 5
                                    }
                                }}
                            />

                            <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, borderRadius: 10, marginTop: 40, width: 153, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, opacity: loading ? 0.5 : 1}} disabled={loading} onPress={handleConfirm}>
                                {loading && <ActivityIndicator color={"#FFF"}/>} 
                                <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Confirmer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{padding: 10, borderRadius: 10, marginTop: 10, width: 200, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, opacity: stopTimer ? 0.5 : 1}} disabled={!stopTimer} onPress={handleResendCode}>
                                <Text style={{color: 'black', fontSize: 15, textAlign: 'center', textDecorationLine: 'underline'}}>Code non reçu ?</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 40,
    paddingBottom: 40
},
});

