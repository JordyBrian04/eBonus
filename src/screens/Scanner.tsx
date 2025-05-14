import { CameraView } from 'expo-camera';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, AppState } from 'react-native';
import { Overlay } from '../components/Overlay';
import { verifCode } from '../services/OnlineRequest';


const Scanner = ({navigation}: any) => {
    const qrLock = React.useRef(false)
    const appState = React.useRef(AppState.currentState)

    React.useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if(appState.current.match(/inactive|background/) && nextAppState==='active') 
            {
                qrLock.current = false
            }

            appState.current = nextAppState
        });

        return () => {
            subscription.remove();
        }
    }, [])
  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing='back'
        onBarcodeScanned={({data}) => {
            if(data && !qrLock.current)
            {
                qrLock.current = true
                setTimeout(async () => {
                  const req:any = await verifCode(data)
                  if(req == true)
                  {
                    navigation.navigate('ValideTransaction', {code: data})
                  }
                  else if (req == 0)
                  {
                    alert("Ce code n'est pas valide")
                  }
                  else
                  {
                    alert("Une erreur inattendu s'est produite veuillez réessayer.")
                  }
                    console.log(data)
                }, 500)
            }
        }}
      />
      <Overlay/>
    </SafeAreaView>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
