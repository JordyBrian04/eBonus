import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../utils/colors';
import { useFonts } from "expo-font";
import { getAllLocalUser } from '../services/LocalRequest';


const SplashScreen = ({navigation}:any) => {


    const user = async () => {

      const res = await getAllLocalUser()
      console.log('res', res)

      // if (res === 0)
      // {
      //   navigation.navigate('Confirmation')
      // }

      if(res?.type_user == 'utilisateur')
      {
        navigation.navigate('Tabs')
      }

      if(res?.type_user == 'agent')
      {
        navigation.navigate('LesPartenaires')
      }

      if(res === false || res === null)
      {
        navigation.navigate('FirstScreen')
      }
    }

    setTimeout(() => {
      user()
        // navigation.navigate("FirstScreen");
    }, 5000)


    // React.useEffect(() => {


    //   user()
    // }, [])

    const [fontsLoaded] = useFonts({
        Bold : require("../assets/fonts/Poppins-Bold.ttf"),
        Regular : require("../assets/fonts/Poppins-Regular.ttf")
    })

    if(!fontsLoaded){
        return undefined
    }
    
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary}/>
      <Text style={{fontFamily: "Bold", fontSize: 50, color: 'white'}}>eBonus</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
