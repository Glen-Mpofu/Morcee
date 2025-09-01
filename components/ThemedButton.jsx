import { Pressable, useColorScheme } from 'react-native';
import ThemedText from '../components/ThemedText';
import ThemedLink from '../components/ThemedLink';
import { Colors } from '../constants/Colors';

const ThemedButton = ({style, children, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <Pressable style = {[{ backgroundColor: Colors.accent, padding: 12, borderRadius: 50, }, style]} {...props}>
        <ThemedText>{children}</ThemedText>
    </Pressable>
  )
}

export default ThemedButton