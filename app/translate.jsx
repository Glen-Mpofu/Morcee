import { StyleSheet, Text, View } from 'react-native'
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import letterAndMorse from './letterCodes'
import { TextInput } from 'react-native'
import React from 'react'
import ThemedButton from '../components/ThemedButton'
import { useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import ThemedLink from '../components/ThemedLink'

const Translate = () => {
  const letterCode = letterAndMorse
  const [input, onChangeInput] = React.useState('MorseCode/Text')
  const [translation, setTranslation] = React.useState('')

  //theme
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  //helper function for displaying my letters and characters
  const chunkArray = ( arr, chunkSize ) => {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize))      
    }
    return result;
  };

  const chunks = chunkArray(letterCode, 5)

  const morseToLetter = {};
    letterCode.forEach(item => {
      morseToLetter[item.MorseCode] = item.Letter;
  });

  return (
    <ThemedView style={styles.container}>
      <TextInput 
        value={input}
        style = {[styles.input, {color: theme.text, fontFamily: 'Exo', 
        borderColor: theme.linkBorderBottomColor}]}
        onChangeText={onChangeInput}       
        keyboardType='default' 
      />

        <ThemedButton onPress = {() => {
          let splitInput = input.toUpperCase().split('')
          let finalTranslation = ''

          const isMorse = /^[.\-\s]+$/.test(input.trim())
          if(!isMorse){
            //letter to morse code
            for (let i = 0; i < splitInput.length; i++) {
              const letter = splitInput[i];
              const foundLetter = letterCode.find( item => item.Letter === letter)
              
              
              if(foundLetter){
                finalTranslation += foundLetter.MorseCode + ' '
              }
              else if ( letter == ' '){
                finalTranslation += '   '
              }
            }
            setTranslation(finalTranslation)
        }
        else{
          const trimmedInput = input.trim();
          const morseWords = trimmedInput.split('   ')

          morseWords.forEach((word, wi) => {
            const letters = word.split(' ')
            letters.forEach( code => {
              finalTranslation+=morseToLetter[code] || '?'
            });
            if(wi < morseWords.length - 1) finalTranslation += ' '
          })

          setTranslation(finalTranslation.trim())
        }

        }} style={{ width: 100, marginVertical: 10, borderBottomWidth: 1, margin: 5, alignItems: 'center'}}>
          Translate
        </ThemedButton>

        {translation !== '' && <ThemedText style={[styles.output, {color: Colors.success, fontFamily: 'SpaceGrotesk'}]}>{translation}</ThemedText>}

      <ThemedText>Letter and Morse Code</ThemedText>
        <View style={[ styles.card, { flexDirection: 'row', flexWrap: 'wrap', borderColor: theme.linkBorderBottomColor }]}>
          {chunks.map((chunk, colIndex) => (
            <View key={colIndex} style={{ marginRight: 20 }}>
              {chunk.map((code, index) => (
                <ThemedText key={index}>
                  {code.Letter} {code.MorseCode}
                </ThemedText>
              ))}
            </View>
        ))}
        </View>
      
      <ThemedLink href={ "/" } >
        <ThemedText>Home</ThemedText>
      </ThemedLink>

    </ThemedView>
  )
}

export default Translate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50
  },
  input: {
    width: 300,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50,
    
  },
  output: {
    fontWeight: 'bold',
    fontSize: 20
  },
  card:{  
    width: 350,
    height: 300,
    borderRadius: 50,
    padding: 20, 
    alignItems: 'center',
    boxShadow: '4px 4px rgba(105, 0, 0, 0.5)', 
    borderWidth: 1
  },
})