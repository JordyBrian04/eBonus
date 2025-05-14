import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, TextInput, Image, Dimensions } from 'react-native';
import {AntDesign, EvilIcons} from '@expo/vector-icons';
import { colors } from '../utils/colors';

const {height: SCREEN_HEIGHT} = Dimensions.get('window')

const InformationUser = ({navigation}:any) => {

    const [userData, SetUserData] = React.useState({
        nomcomplet: '',
        numero: ''
    })

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
      <ScrollView style={{padding: 20, flex:1, backgroundColor: colors.background }}>
        <TouchableOpacity style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
          <Text style={{fontFamily: 'SemiBold', fontSize: 24}}>Mes informations</Text>
        </TouchableOpacity>

        <View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require("../assets/images/user.png")} style={{width: 90, height: 90}} />
        </View>

        <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>
            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Nom complet
                </Text>
                <TextInput
                    placeholder="Entrez votre nom complet"
                    style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 10, marginTop: 10, height: 56}}
                    returnKeyType='next'
                    value={userData.nomcomplet}
                    onChangeText={(e) => SetUserData({...userData, nomcomplet:e})}
                    readOnly
                />
            </View>

            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Numéro de téléphone
                </Text>
                <TextInput
                    placeholder="Entrez votre numéro de téléphone"
                    style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 10, marginTop: 10, height: 56}}
                    returnKeyType='next'
                    value={userData.numero}
                    onChangeText={(e) => SetUserData({...userData, numero:e})}
                    keyboardType='phone-pad'
                    readOnly
                />
            </View>

            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Email
                </Text>
                <TextInput
                    placeholder="Entrez votre email"
                    style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 10, marginTop: 10, height: 56}}
                    returnKeyType='next'
                    value={userData.numero}
                    onChangeText={(e) => SetUserData({...userData, numero:e})}
                    keyboardType='email-address'
                />
            </View>

            <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', gap: 15, height: 50}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#fff"}}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationUser;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
