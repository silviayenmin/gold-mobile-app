import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { useNavigation } from '@react-navigation/native';
import { Coins } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  
  // Standard Animated values
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 10,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(progressWidth, {
        toValue: width * 0.6,
        duration: 2000,
        useNativeDriver: false, // width animation doesn't support native driver
      })
    ]).start();
    
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.LOGIN);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={GRADIENTS.dark as any}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View
        style={[
          styles.logoContainer, 
          { opacity: logoOpacity, transform: [{ scale: logoScale }] }
        ]}
      >
        <LinearGradient
          colors={GRADIENTS.gold as any}
          style={styles.iconBackground}
        >
          <Coins size={60} color={COLORS.white} />
        </LinearGradient>
        
        <Text style={styles.title}>LOCATOR</Text>
        <Text style={styles.subtitle}>Secure Your Future with Gold</Text>
      </Animated.View>

      <View style={styles.loaderContainer}>
        <Animated.View style={[styles.loaderLine, { width: progressWidth }]}>
          <LinearGradient
            colors={GRADIENTS.gold as any}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    letterSpacing: 4,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginTop: 10,
    fontFamily: 'Inter-Regular',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 100,
    width: width * 0.6,
    height: 4,
    backgroundColor: COLORS.card,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderLine: {
    height: '100%',
  },
});

export default SplashScreen;