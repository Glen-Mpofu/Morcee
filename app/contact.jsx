import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import { StyleSheet, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors';

//themed components
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';

const Contact = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <ThemedView style = {[ styles.container, {background: theme.background} ]}>
      <ThemedText style = {styles.title}>Contact Page</ThemedText>
      <Link href={"/"} style = {styles.link}> 
        <ThemedText>Home</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Contact

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
    link:{
        marginVertical: 10,
        borderBottomWidth: 1
    }
})