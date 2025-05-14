import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { getAgentData, insertTransaction } from '../services/OnlineRequest';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../utils/colors';
import {AntDesign} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const ValideTransaction = ({navigation, route}: any) => {
    const {code} = route.params;
    const [detail, setDetail] = React.useState<any>([]);
    const [isFocused1, setIsFocused1] = React.useState<boolean>(false);
    const [isFocused2, setIsFocused2] = React.useState<boolean>(false);
    const [loading, SetLoading] = React.useState(false)

    const [data, setData] = React.useState({
        montant: '',
        montantEspece: '',
        code: '',
        codeAgent: code
    })


    const getAgent = async () => {
        const req:any = await getAgentData(code)
        setDetail(req)
    }

    useFocusEffect(
        React.useCallback(() => {
            getAgent()
        }, [])
    )

    const setMontant = (montant:any) => {
        if(montant > 0)
        {
            const espece = montant - (montant*(detail.remisePartenaire/100))
            setData({...data, montantEspece: espece.toLocaleString(), montant: montant})
        }
        else
        {
            setData({...data, montant: '', montantEspece: ''})
        }
    }

    const handleValider = async () => {
        SetLoading(true)
        if(data.montant != '' || data.code != '')
        {
            if(parseInt(data.montant) < 100)
            {
                alert("Le montant total doit être supérieur à 100")
                return
            }

            const req:any = await insertTransaction(data)

            if(req == -1)
            {
                alert("Code agent incorrect")
                SetLoading(false)
                return
            }

            if(req == -100)
            {
                alert("Votre solde eBonus est insuffisant pour effectuer cet achat")
                SetLoading(false)
                return
            }

            if(req == 200)
            {
                alert('Achat effectué avec succès!')
                SetLoading(false)
                navigation.navigate('Tabs')
            }
        }
        else
        {
            alert('Veuillez saisir les champs obligatoires')
            SetLoading(false)
            return
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
            <StatusBar barStyle='dark-content' backgroundColor={colors.background} />
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0} style={{flex: 1, width: '100%', padding: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                            <AntDesign name="left" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: '90%'}}>
                            <Text style={{fontFamily: 'SemiBold'}}>Valider une transaction</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
                        <View>
                            <Text style={{fontFamily: 'Regular', color: colors.Secondary}}>Achat à</Text>
                            <Text style={{fontFamily: 'SemiBold'}}>{detail.nomPartenaire} - {detail.adressePartenaire}</Text>
                            <View style={{height: 1, backgroundColor: colors.Secondary, marginTop: 5}}></View>
                        </View>

                        {/* <View>
                            <Text style={{fontFamily: 'Regular', color: colors.Secondary}}>Agent</Text>
                            <Text style={{fontFamily: 'SemiBold'}}>{detail.nomAgent}</Text>
                            <View style={{height: 1, backgroundColor: colors.Secondary, marginTop: 5}}></View>
                        </View> */}

                        <View>
                            <Text style={{fontFamily: 'Regular', color: colors.Secondary}}>Montant achat<Text style={{fontFamily: 'Regular', color: 'red'}}>*</Text></Text>
                            <TextInput
                                placeholder="Montant total de l'achat"
                                keyboardType='numeric'
                                style={{borderBottomWidth: 1, borderColor: isFocused1 ? colors.primary : colors.Secondary, fontFamily: 'Regular'}}
                                onFocus={() => setIsFocused1(true)}
                                onBlur={() => setIsFocused1(false)}
                                onChangeText={(text) => {
                                    setMontant(text)
                                }}
                                // value={data.montant.toLocaleString()}
                            />
                        </View>

                        <View>
                            <Text style={{fontFamily: 'Regular', color: colors.Secondary}}>Montant à payer en espèce</Text>
                            <TextInput
                                placeholder="0"
                                keyboardType='numeric'
                                style={{borderBottomWidth: 1, borderColor:colors.Secondary, fontFamily: 'Regular'}}
                                readOnly
                                value={data.montantEspece}
                            />
                        </View>
                        
                        <View>
                            <Text style={{fontFamily: 'Regular', color: colors.Secondary}}>Code agent <Text style={{fontFamily: 'Regular', color: 'red'}}>*</Text></Text>
                            <TextInput
                                placeholder="Code de l'agent"
                                keyboardType='default'
                                style={{borderBottomWidth: 1, borderColor: isFocused2 ? colors.primary : colors.Secondary, fontFamily: 'Regular'}}
                                onFocus={() => setIsFocused2(true)}
                                onBlur={() => setIsFocused2(false)}
                                value={data.code}
                                onChangeText={(e) => setData({...data, code:e})}
                                autoCapitalize='none'
                            />
                        </View>

                        <Text style={{alignSelf: 'center', fontFamily: 'SemiBold', color: colors.primary}}>Frais partenaire : {detail.remisePartenaire}%</Text>
                    </View>
                </KeyboardAvoidingView>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, flexGrow: 1}}>
                    <TouchableOpacity style={{ width: '100%', padding: 14, backgroundColor: colors.primary, borderRadius: 20, justifyContent: 'center', alignItems: 'center', opacity: loading? 0.5:1, flexDirection: 'row', gap: 10}} disabled={loading} onPress={handleValider}>
                        {loading && <ActivityIndicator size="small" color="#fff" /> }
                        <Text style={{fontFamily: 'SemiBold', color: 'white'}}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ValideTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
