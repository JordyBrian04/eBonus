import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../utils/colors';
import {AntDesign, EvilIcons} from '@expo/vector-icons';

const Support = ({navigation}:any) => {
  const [fontsLoaded] = useFonts({
    Bold : require("../assets/fonts/Poppins-Bold.ttf"),
    Regular : require("../assets/fonts/Poppins-Regular.ttf"),
    SemiBold : require("../assets/fonts/Poppins-SemiBold.ttf"),
    ExtraLight : require("../assets/fonts/Poppins-ExtraLight.ttf"),
    Light : require("../assets/fonts/Poppins-Light.ttf"),
  })

  if(!fontsLoaded){
      return undefined
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <ScrollView style={{flex:1, padding: 20, backgroundColor: colors.background}}>
        <TouchableOpacity style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
          <Text style={{fontFamily: 'SemiBold', fontSize: 24}}>Support</Text>
        </TouchableOpacity>

        <View style={{padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
          <Image source={require("../assets/images/support.png")} style={{width: '100%', height: 200}} />
          <Text style={{marginTop: 20, fontFamily: 'Regular', fontSize: 18, textAlign: 'center'}}>Contactez-nous pour tous besoin d'assistance en ligne !</Text>
        </View>

        <View style={{padding: 20, marginTop: 20, flexDirection: 'column', gap: 20}}>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 16}}>Email</Text>
            <Text style={{fontFamily: 'Bold', fontSize: 16}}>support@ebonus.ci</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 16}}>Numéro 1</Text>
            <Text style={{fontFamily: 'Bold', fontSize: 16}}>07 xx xx xx xx</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Regular', fontSize: 16}}>Numéro 2</Text>
            <Text style={{fontFamily: 'Bold', fontSize: 16}}>05 xx xx xx xx</Text>
          </View>
        </View>

        <View style={{padding: 20, flexDirection: 'column', gap: 20}}>
          <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, justifyContent: 'center', alignItems: 'center', height: 56, borderRadius: 14}}>
            <Text style={{color: "#fff", fontFamily: 'SemiBold', fontSize: 16}}>Nous écrire</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, justifyContent: 'center', alignItems: 'center', height: 56, borderRadius: 14}}>
            <Text style={{color: "#fff", fontFamily: 'SemiBold', fontSize: 16}}>Nous envoyer un mail</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
