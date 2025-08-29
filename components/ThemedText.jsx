import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors';

const ThemedText = ({style, children, ...props}) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <Text style = {[{ fontFamily: 'Exo', color: theme.text }, style ]} {...props} > {children} </Text>
  )
}

export default ThemedText