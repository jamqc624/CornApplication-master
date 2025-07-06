// components/GlassCard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

export default function GlassCard({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={20} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 16,
  },
  content: {
    padding: 20,
  },
});
