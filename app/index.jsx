import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native'
import { Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

//themed components
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import ThemedLink from '../components/ThemedLink';
import ThemedButton from '../components/ThemedButton';

const Home = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <ThemedView style = {styles.container}>

        <Image source={ require("../assets/logo.png") } style = {[styles.img, { tintColor: theme.imageColor }]}/>
        <ThemedText style = {{ fontStyle: 'italic', color: theme.text}}>
            morse code to english. english to...
        </ThemedText>
        <ThemedText style = {[styles.title, {color: theme.text}]}>Morcee</ThemedText>
        
        <ThemedLink href={"/translate"}>
            <ThemedButton>
                Translate
            </ThemedButton>
        </ThemedLink>

        <View style = {styles.linkView}>
            <ThemedLink href={ "/about" } >
                <ThemedText>About</ThemedText>
            </ThemedLink>
            <ThemedLink href={ "/contact" } >
                <ThemedText>Contact</ThemedText>
            </ThemedLink>
        </View>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', // horizontal
    justifyContent: 'center' // vertical
  },
  title:{
    fontWeight: 'bold',
    fontSize: 18
  }, 
  card:{
    backgroundColor: '#eb9494ff',
    width: 300,
    height: 300,
    borderRadius: 50,
    padding: 20, 
    alignItems: 'center',
    boxShadow: '4px 4px rgba(105, 0, 0, 0.5)'
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 50,
  },
  linkView: {
    flexDirection: 'row',
  },
})