import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../utils/colors';

const SecondScreen = ({navigation}:any) => {

    const [fontsLoaded] = useFonts({
        Bold : require("../../assets/fonts/Poppins-Bold.ttf"),
        Regular : require("../../assets/fonts/Poppins-Regular.ttf")
    })

    if(!fontsLoaded){
        return undefined
    }
    
  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background}/>
        <Image source={require("../../assets/images/téléchargement.png")} style={{width: 500, height: 500, borderBottomLeftRadius: 200}}/>
        {/* <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, top:0, height: '50%', borderBottomStartRadius: 280}}>
        </View> */}

        <Text style={{fontSize: 20, fontFamily: 'Bold', color: "#000", textAlign: 'center', marginTop: 20}}>
            Payez moins avec <Text style={{fontFamily: 'Bold', color: colors.primary}}>eBonus</Text>
        </Text>
        <Text style={{fontSize: 16, fontFamily: 'Regular', color: "#000", textAlign: 'center', marginTop: 20}}>
            Avec eBonus, faites des économies sur vos achats dans les magasins partenaires.
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30, gap: 20}}>
            <View style={{width: 50, height: 10, backgroundColor: colors.Secondary, borderRadius: 100}}/>
            <View style={{width: 50, height: 10, backgroundColor: colors.primary, borderRadius: 100}}/>
            <View style={{width: 50, height: 10, backgroundColor: colors.Secondary, borderRadius: 100}}/>
        </View>

        <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity style={{backgroundColor: colors.Secondary, padding: 10, borderRadius: 10, marginTop: 20, width: '40%'}} onPress={() => navigation.navigate('FirstScreen', {screen: 'FirstScreen', animation: Platform.OS === 'ios' ? 'ios_from_left' : 'slide_from_left'})}>
                <Text style={{fontSize: 16, fontFamily: 'Bold', color: "#000", textAlign: 'center'}}>
                    Précedent
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, borderRadius: 10, marginTop: 20, width: '40%'}} onPress={() => navigation.navigate('ThirdScreen', {screen: 'ThirdScreen', animation: Platform.OS === 'ios' ? 'ios_from_right' : 'slide_from_right', duration: 50})}>
                <Text style={{fontSize: 16, fontFamily: 'Bold', color: "#fff", textAlign: 'center'}}>
                    Suivant
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingHorizontal: 20,
  }
});
