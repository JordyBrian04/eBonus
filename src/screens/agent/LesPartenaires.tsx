import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, TextInput, RefreshControl} from 'react-native';
import { colors } from '../../utils/colors';
import {FontAwesome5, Feather, Ionicons, AntDesign, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { getAll } from '../../services/OnlineRequest';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';

interface LesPartenairesProps {}

const LesPartenaires = ({navigation}:any) => {

    const [partenaire, setPartenaire] = React.useState<any>([])
    const [oldPartenaire, setOldPartenaire] = React.useState<any>([])
    const [refresh, setRefreshing] = React.useState(false);

    const getPartenaires = async () => {
      const res:any = await getAll()
      setPartenaire(res)
      setOldPartenaire(res)
    //   console.log(res)
    }
  
    useFocusEffect(
      React.useCallback(() => {
        getPartenaires();
      }, [])
    )

    const recherche = (text:any) => {
        const filtre = oldPartenaire.filter((data:any) => data.nom && data.nom.includes(text))
        setPartenaire(filtre)
    }

    const refreshing = () => {
        setRefreshing(true);
    
        getPartenaires();
    
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
  
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
              <Text style={{color: "#fff", fontFamily: 'Bold', fontSize: 40, textAlign: 'center'}}>Liste des partenaires</Text>
          </View>
      </View>
      <ScrollView style={{flex:1, backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20}} refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshing} />}>
        <View style={{marginTop: 20, flexDirection: 'column', gap: 20, padding: 20}}>
            <TouchableOpacity style={{backgroundColor: colors.primary, padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', gap: 15}} onPress={() => navigation.navigate('AjoutPartenaire')}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#fff"}}>
                    Ajouter un partenaire
                </Text>
            </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.Secondary, borderRadius: 10}}>
            <EvilIcons name="search" size={34} color={colors.Secondary} />
            <TextInput
              placeholder="Entrez le nom d'un partenaire"
              style={{padding: 10, width: '90%'}}
              onChangeText={(e) => recherche(e)}
            />
          </View>

          {/* Centre commercial */}
          {/* <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10}}>
            <Text style={{fontFamily: 'Bold', fontSize: 18}}>Centres commerciaux et autres</Text> */}
            <View style={{flexDirection: 'column', gap: 10}}>

              {
                partenaire.map((items:any, index:any) => {
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

export default LesPartenaires;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
      }
});
