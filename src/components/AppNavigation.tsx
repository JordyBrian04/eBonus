import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';


import SplashScreen from '../screens/SplashScreens';
import FirstScreen from '../screens/introduction/FirstScreens';
import SecondScreen from '../screens/introduction/SecondScreens';
import ThirdScreen from '../screens/introduction/ThirdScreens';
import Connexion from '../screens/Connexion';
import Inscription from '../screens/Inscription';
import Confirmation from '../screens/Confirmation';
import Home from '../screens/(tabs)/Home';
import Boutique from '../screens/Boutique';
import Support from '../screens/Support';
import Profile from '../screens/(tabs)/Profile';
import Partenaires from '../screens/(tabs)/Partenaires';
import InformationUser from '../screens/InformationUser';
import Stations from '../screens/(tabs)/Stations';
import Scanner from '../screens/Scanner';
import ValideTransaction from '../screens/ValideTransaction';
import LesPartenaires from '../screens/agent/LesPartenaires';
import AjoutPartenaire from '../screens/agent/AjoutPartenaire';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyTabBar } from './TabBar';



const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator()
const db = SQLite.openDatabaseAsync('local.db');

const AppNavigation = () => {

  const initDatabse = async () => {
    try {
      (await db).execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user_ebonus(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nomcomplet TEXT NOT NULL,
          numero TEXT NOT NULL,
          email TEXT NOT NULL,
          sta INTEGER DEFAULT 0,
          solde INTEGER DEFAULT 0,
          type_user TEXT DEFAULT NULL
        );
        ALTER TABLE user_ebonus ADD type_user TEXT DEFAULT NULL;
        `);
        
        console.log('Database created!');

        // (await db).execAsync(`DELETE FROM user_ebonus`)
    } catch (error) {
      console.error('Error database creation ', error);
    }
  }

  React.useEffect(() => {
    initDatabse()
  }, [])


    const TabStackScreens = () => {
        // screenOptions={screenOptions}
        return (
          <TabStack.Navigator tabBar={props => <MyTabBar {...props} />} >
            <TabStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <TabStack.Screen options={{ headerShown: false }} name="Stations" component={Stations} />
            <TabStack.Screen options={{ headerShown: false }} name="Partenaires" component={Partenaires}/>
            <TabStack.Screen options={{ headerShown: false }} name="Profil" component={Profile} />
          </TabStack.Navigator>
        )
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false, gestureEnabled: false, animation: Platform.OS === 'ios' ? 'ios_from_left' : 'slide_from_left'}}/>
                <Stack.Screen name="SecondScreen" component={SecondScreen} options={{headerShown: false, gestureEnabled: false, animation: Platform.OS === 'ios' ? 'ios_from_right' : 'slide_from_right'}}/>
                <Stack.Screen name="ThirdScreen" component={ThirdScreen} options={{headerShown: false, gestureEnabled: false, animation: Platform.OS === 'ios' ? 'ios_from_right' : 'slide_from_right'}}/>
                <Stack.Screen name="Connexion" component={Connexion} options={{headerShown: false, gestureEnabled: false, animation: Platform.OS === 'ios' ? 'ios_from_right' : 'slide_from_right'}}/>
                <Stack.Screen name="Inscription" component={Inscription} options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="Confirmation" component={Confirmation} options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Tabs" component={TabStackScreens}/>
                <Stack.Screen name="Support" component={Support} options={{headerShown: false}}/>
                <Stack.Screen name="Boutique" component={Boutique} options={{headerShown: false}}/>
                <Stack.Screen name="InformationUser" component={InformationUser} options={{headerShown: false}}/>
                <Stack.Screen name="Scanner" component={Scanner} options={{headerShown: false}}/>
                <Stack.Screen name="ValideTransaction" component={ValideTransaction} options={{headerShown: false}}/>
                <Stack.Screen name="LesPartenaires" component={LesPartenaires} options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="AjoutPartenaire" component={AjoutPartenaire} options={{headerShown: false, gestureEnabled: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
  );
};

export default AppNavigation;

