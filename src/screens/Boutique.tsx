import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../utils/colors';
import {AntDesign, EvilIcons} from '@expo/vector-icons';

const Boutique = ({navigation}:any) => {
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
      <StatusBar barStyle='dark-content' />
      <ScrollView style={{flex:1, padding: 20, backgroundColor: colors.background}}>
        <TouchableOpacity style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => navigation.navigate("Tabs")}>
          <AntDesign name="left" size={24} color="black" />
          <Text style={{fontFamily: 'SemiBold', fontSize: 24}}>Boutique</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Boutique;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
