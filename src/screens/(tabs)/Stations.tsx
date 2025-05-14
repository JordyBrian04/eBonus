import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native';
import { colors } from '../../utils/colors';
import {FontAwesome5, Feather, Ionicons, AntDesign, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { getAllStation } from '../../services/OnlineRequest';
import { useFocusEffect } from '@react-navigation/native';

const Stations = ({navigation}:any) => {

  const [stations, setStation] = React.useState<any>([])

  const getStations = async () => {
    const res:any = await getAllStation()
    setStation(res)
    console.log(res)
  }

  useFocusEffect(
    React.useCallback(() => {
      getStations();
    }, [])
  )


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
              <Text style={{color: "#fff", fontFamily: 'Bold', fontSize: 40}}>Nos stations partenaires</Text>
          </View>
      </View>
      <ScrollView style={{flex:1, backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <View style={{marginTop: 20, flexDirection: 'column', gap: 20, padding: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10}}>
            <EvilIcons name="search" size={34} color={colors.Secondary} />
            <TextInput
              placeholder="Entrez le nom d'une station"
              style={{padding: 10, width: '90%'}}
            />
          </View>

                    {/* Stations */}
          {/* <View style={{backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10}}> */}
            {/* <Text style={{fontFamily: 'Bold', fontSize: 18}}>Stations services</Text> */}
            <View style={{flexDirection: 'column', gap: 15}}>

              {
                stations.map((items:any, index:any) => {
                  return(
                    <TouchableOpacity key={index}>
                      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <Image source={{uri: items.logo}} style={{width: 60, height: 60, borderRadius: 20}}/>
                        <Text style={{fontFamily: 'SemiBold', fontSize: 14}}>{items.nom} - {items.adresse} ({items.remise}%)</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }

            </View>
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Stations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  }
});
