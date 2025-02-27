import { useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SplashScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); // Navigate to LoginScreen after 2.5 seconds
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayoutRootView}>
      <Image
        source={require('../assets/images/Logo.gif')}
        style={{ width: 150, height: 150 }}
        contentFit="contain"
        priority="high"
      />
      <ThemedText style={{ fontSize: 32, fontFamily: 'ABeeZee', marginTop: 30 }}>LearnAI</ThemedText>
      <ThemedText style={{ fontSize: 18, marginTop: 15 }}>Smart Learning, Smarter Future!</ThemedText>
    </ThemedView>
  );
}