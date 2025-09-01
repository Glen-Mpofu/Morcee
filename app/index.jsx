import { StyleSheet, View, Image, useColorScheme, Animated, Easing, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

//themed components
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import ThemedLink from '../components/ThemedLink';
import ThemedButton from '../components/ThemedButton';
import React, { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const getRandomChar = () => letters[Math.floor(Math.random() * letters.length)];

const MatrixColumn = ({ xPosition, speed }) => {
  const translateY = useRef(new Animated.Value(-height)).current;

  useEffect(() => {
    const loopAnimation = () => {
      translateY.setValue(-height);
      Animated.timing(translateY, {
        toValue: height,
        duration: speed,
        useNativeDriver: true,
      }).start(() => loopAnimation());
    };
    loopAnimation();
  }, []);

  const chars = Array.from({ length: 30 }, () => getRandomChar());

  return (
    <Animated.View style={{ position: 'absolute', left: xPosition, transform: [{ translateY }] }}>
      {chars.map((char, i) => (
        <Text key={i} style={{ color: '#0f0', fontFamily: 'Courier', fontSize: 16 }}>
          {char}
        </Text>
      ))}
    </Animated.View>
  );
};

const Home = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const logoY = useRef(new Animated.Value(-50)).current; // Logo slides down
  const textOpacity = useRef(new Animated.Value(0)).current; // Text fades in
  const textY = useRef(new Animated.Value(20)).current; // Text slides up

  useEffect(() => {
    Animated.timing(logoY, {
      toValue: 0,
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 1200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const columns = Math.floor(width / 20); // number of columns for Matrix effect

  return (
      <ThemedView style={[styles.container]}>
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[styles.img, { tintColor: theme.imageColor, transform: [{ translateY: logoY }] }]}
        />
        <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textY }], alignItems: 'center' }}>
          <ThemedText style={{ fontStyle: 'italic', color: theme.text }}>
            morse code to english. english to...
          </ThemedText>
          <ThemedText style={[styles.title, { color: theme.text }]}>Morcee</ThemedText>
        </Animated.View>

        <ThemedLink href={'/translate'}>
          <ThemedButton>Translate</ThemedButton>
        </ThemedLink>

        <View style={styles.linkView}>
          <ThemedLink href={'/about'}>
            <ThemedText>About</ThemedText>
          </ThemedLink>
        </View>

        {/* MATRIX EFFECT BELOW */}
        <View style={{ width: '100%', height: '50%', marginTop: 20, overflow: 'scroll'}} >
          {Array.from({ length: columns }).map((_, i) => (
            <MatrixColumn key={i} xPosition={i * 20} speed={Math.random() * 5000 + 4000} />
          ))}
        </View>
      </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 50,
  },
  linkView: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
