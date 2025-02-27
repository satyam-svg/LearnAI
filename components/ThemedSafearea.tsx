import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

interface ThemedSafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function ThemedSafeAreaView({ children, style }: ThemedSafeAreaViewProps) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 🔥 Hamesha black background
  },
});
