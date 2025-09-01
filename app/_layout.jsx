import { StyleSheet,useColorScheme } from 'react-native'
import {Stack} from 'expo-router'
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

const RootLayout = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light

    //adding fonts
    const [loaded] = useFonts({
        Exo: require("../assets/fonts/Exo2-VariableFont_wght.ttf"),
        SpaceGrotesk: require("../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf")
    })

    if (!loaded) return null;
    
  return (   
    <>
        <StatusBar style="auto" />
        <Stack screenOptions={{
            headerStyle: {backgroundColor: theme.navBackground}, //color of the header
            headerTintColor: theme.text, //color of the text
            headerTitleStyle: {fontFamily: 'SpaceGrotesk'}
        }}>
            <Stack.Screen name = "index" options={{
                title: 'Home', headerShown: false
            }}/>

            <Stack.Screen name = "about" options={{
                title: 'About'
            }}/>
            <Stack.Screen name = "translate" options={{
                title: 'Translate', headerShown: false
            }}/>
        </Stack>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})