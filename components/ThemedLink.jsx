import { Link } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../constants/Colors";

const ThemedLink = ({style, children, ...prop}) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <Link style= {[{ marginVertical: 10, borderBottomWidth: 1, margin: 5, borderColor: theme.linkBorderBottomColor }, style]} 
    {...prop} asChild>{children}</Link>
  )
}

export default ThemedLink