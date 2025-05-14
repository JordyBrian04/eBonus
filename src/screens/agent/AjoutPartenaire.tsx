import { useFonts } from 'expo-font';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, TextInput, Image, Dimensions } from 'react-native';
import {AntDesign, EvilIcons} from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { SelectList } from 'react-native-dropdown-select-list'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

const {height: SCREEN_HEIGHT} = Dimensions.get('window')

const AjoutPartenaire = ({navigation}:any) => {

    const [image, setImage] = React.useState({
        url: '',
        data: {},
      });

    const [partenaireData, setPartenaireData] = React.useState({
        type_partenaire: '',
        nom: '',
        logo: '',
        adresse: '',
        remise: '',
        email: ''
    })

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        // let options:any = {
        //     mediaType: 'photo',
        //     quality: 1,
        // };
      
        // await launchImageLibrary(options, (response:any) => {
        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.errorCode) {
        //       console.log('ImagePicker Error: ', response.errorMessage);
        //     } else {
        //         console.log(response.assets[0].uri)
        //         setImage(prevUserData => ({
        //             ...prevUserData,
        //             url: response.assets[0].uri,
        //             data: response.assets[0]
        //         }));
            
        //         // ImportFile(image)
        //         // .then((result) => {
        //         //   console.log(result);
        //         // })
        //         // .catch((err) => {
        //         //   console.error('Error importing file : ', err)
        //         // })
        //     }
        //   });

        let result
    
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        })

        if(!result?.canceled)
        {
            setImage(prevUserData => ({
                ...prevUserData,
                url: result.assets[0].uri,
                data: result.assets[0]
            }));
        }
        console.log(result);
    
      };

    const SelectOptions = [
        { key: 1, value: 'Magasin' },
        { key: 2, value: 'Station' }
      ]

  const [fontsLoaded] = useFonts({
    Bold : require("../../assets/fonts/Poppins-Bold.ttf"),
    Regular : require("../../assets/fonts/Poppins-Regular.ttf"),
    SemiBold : require("../../assets/fonts/Poppins-SemiBold.ttf")
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
          <Text style={{fontFamily: 'SemiBold', fontSize: 24}}>Ajouter un partenaire</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>

            <View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10}}>
                {image.url ? <Image source={{ uri: image.url }} style={{width: 90, height: 90, borderColor: colors.Secondary, borderWidth: 1, borderRadius: 100}} /> : <Image style={{width: 90, height: 90, borderColor: colors.Secondary, borderWidth: 1, borderRadius: 100}} />}
                <TouchableOpacity onPress={pickImage}>
                    <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>Télécharger une image</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Type de partenaire
                </Text>
                <SelectList
                    setSelected={(val: any) => [
                    //   setAffichage(val),
                    setPartenaireData({...partenaireData, type_partenaire:val}),
                    console.log(val)
                    ]}
                    data={SelectOptions}
                    defaultOption={{ key: 1, value: "Magasin" }}
                    save="value"
                    inputStyles={{borderColor: colors.primary}}
                    boxStyles={{borderColor: colors.primary, marginTop: 10,}}
                />
            </View>

            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Nom
                </Text>
                <TextInput
                    placeholder="Entrez le nom du partenaire"
                    style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 10, marginTop: 10, height: 46}}
                    returnKeyType='next'
                    value={partenaireData.nom}
                    onChangeText={(e) => setPartenaireData({...partenaireData, nom:e})}
                />
            </View>

            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Email
                </Text>
                <TextInput
                    placeholder="partenaire@xyz.com"
                    style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 10, marginTop: 10, height: 46}}
                    returnKeyType='next'
                    value={partenaireData.email}
                    onChangeText={(e) => setPartenaireData({...partenaireData, email:e})}
                    keyboardType='email-address'
                    readOnly
                />
            </View>

            <View style={{width: '100%'}}>
                <Text style={{fontFamily: 'SemiBold', fontSize: 16, color: "#000"}}>
                    Remise
                </Text>
                <TextInput
                    placeholder="Entrez une remise"
                    style={{borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 10, marginTop: 10, height: 46}}
                    returnKeyType='next'
                    value={partenaireData.remise}
                    onChangeText={(e) => setPartenaireData({...partenaireData, remise:e})}
                    keyboardType='numeric'
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

export default AjoutPartenaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
