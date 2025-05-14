import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity} from 'react-native';
import { colors } from '../../utils/colors';
import {FontAwesome5, Feather, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';

const Profile = ({navigation}:any) => {
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
      <StatusBar barStyle='light-content' />
      <View style={{backgroundColor: colors.primary, width: '100%', padding: 20}}>
          <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: "#fff", fontFamily: 'Bold', fontSize: 40}}>Mon profil</Text>
          </View>
      </View>
      <ScrollView style={{flex:1, backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <View style={{padding: 20, flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image source={require("../../assets/images/user.png")} style={{width: 90, height: 90}} />
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={{fontFamily: 'Bold', fontSize: 20}}>Jordy Brian</Text>
            <Text style={{color: colors.Secondary, fontFamily: 'Regular'}}>07xxxxxxxx</Text>
          </View>
        </View>

        <View style={{padding: 20, flexDirection: 'column', gap: 20}}>

          <TouchableOpacity style={{width: '100%', backgroundColor: "#f5f5f5", borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10}} onPress={() => navigation.navigate("InformationUser")}>
            <FontAwesome5 name="user" size={24} color="black" />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
              <Text style={{fontFamily: 'SemiBold'}}>Informations personnelles</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%', backgroundColor: "#f5f5f5", borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10}} onPress={() => navigation.navigate("Support")}>
            <MaterialIcons name="support-agent" size={24} color="black" />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
              <Text style={{fontFamily: 'SemiBold'}}>Support</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%', backgroundColor: "#f5f5f5", borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10}}>
            <Ionicons name="book-outline" size={24} color="black" />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
              <Text style={{fontFamily: 'SemiBold'}}>Conditions Générales d'Utilisation</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%', backgroundColor: "#f5f5f5", borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10}}>
            <Feather name="lock" size={24} color="black" />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
              <Text style={{fontFamily: 'SemiBold'}}>Politique de confidentialités</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%', backgroundColor: "#f5f5f5", borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10}}>
            <Feather name="share" size={24} color="black" />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
              <Text style={{fontFamily: 'SemiBold'}}>Partager l'application</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '100%', borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, justifyContent: 'center'}}>
            <AntDesign name="logout" size={24} color="red" />
            <Text style={{fontFamily: 'SemiBold', color: 'red'}}>Se déconnecter</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  }
});
