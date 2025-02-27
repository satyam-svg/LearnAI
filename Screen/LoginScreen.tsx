import React, { useState, useEffect, useRef } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafearea';
import { View, Animated, Easing } from 'react-native';
import SplashScreen from '@/components/SplashScreen'; // Import the SplashScreen component

export default function LoginScreen() {
  const [showSplash, setShowSplash] = useState(true);

  // Animation values for the login content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Hide the SplashScreen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2540);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  useEffect(() => {
    // Start the animation when the SplashScreen is hidden
    if (!showSplash) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showSplash, fadeAnim, slideAnim]);

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      {showSplash ? (
        // Show the SplashScreen
        <SplashScreen />
      ) : (
        // Show the login content with animation
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <ThemedText style={{ fontSize: 24 }}>Welcome to Login Screen!</ThemedText>
          </Animated.View>
        </ThemedView>
      )}
    </ThemedSafeAreaView>
  );
}