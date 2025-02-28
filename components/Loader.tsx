import { useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SplashScreen() {
  


  

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Image
        source={require('../assets/images/Logo.gif')}
        style={{ width: 150, height: 150 }}
        contentFit="contain"
        priority="high"
      />
    </ThemedView>
  );
}