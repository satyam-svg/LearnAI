import React, { useState, useEffect, useRef } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafearea';
import { View, Animated, Easing, Image, TextInput, TouchableOpacity } from 'react-native';
import SplashScreen from '@/components/SplashScreen';
import LoaderScreen from '../components/Loader'; // Import your LoaderScreen component
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export default function LoginScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // State for LoaderScreen visibility

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setIsFontLoaded(true);
    }
  }, [fontsLoaded]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && isFontLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [showSplash, isFontLoaded]);

  // Handle Sign Up Button Press
  const handleSignUpPress = () => {
    setShowLoader(true); // Show LoaderScreen
    setTimeout(() => {
      setShowLoader(false); // Hide LoaderScreen
      navigation.navigate('Signup'); // Navigate to Signup screen
    }, 5000); // 5 seconds delay
  };

  if (!isFontLoaded) {
    return null;
  }

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <ThemedView style={{ flex: 1 }}>
          {/* Logo and Title */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              position: 'absolute',
              top: '10%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../assets/images/Logo.png')}
              style={{ width: 100, height: 100, marginBottom: 20 }}
              resizeMode="contain"
            />
            <ThemedText style={{ fontSize: 32, fontFamily: 'ABeeZee' }}>
              LearnAI
            </ThemedText>
            <ThemedText style={{ fontSize: 16, fontFamily: 'ABeeZee' }}>
              Smart Learning, Smarter Future!
            </ThemedText>
          </Animated.View>

          {/* Login Form */}
          <View style={{ 
            position: 'absolute', 
            top: '50%', 
            width: '90%',
            alignSelf: 'center',
          }}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
              Login
            </ThemedText>

            {/* Email Input */}
            <View style={{ marginBottom: 15 }}>
              <ThemedText style={{ marginBottom: 5 }}>Email/Mobile No</ThemedText>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1c1c1c',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 12,
              }}>
                <MaterialIcons name="email" size={20} color="gray" style={{ marginRight: 10 }} />
                <TextInput
                  style={{ color: 'white', flex: 1 }}
                  placeholder="Enter your email"
                  placeholderTextColor="gray"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 20 }}>
              <ThemedText style={{ marginBottom: 5 }}>PIN</ThemedText>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1c1c1c',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 12,
              }}>
                <MaterialIcons name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                <TextInput
                  style={{ color: 'white', flex: 1 }}
                  placeholder="Enter your PIN"
                  placeholderTextColor="gray"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity>
              <LinearGradient
                colors={['#CA17BC', '#FE1F14', '#FFB800']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <ThemedText style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                  Login
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <ThemedText style={{ color: 'gray' }}>
                Don't have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={handleSignUpPress}>
                <Text style={{ color: '#ff8c00', fontWeight: 'bold' }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* LoaderScreen */}
          {showLoader && <LoaderScreen />}
        </ThemedView>
      )}
    </ThemedSafeAreaView>
  );
}