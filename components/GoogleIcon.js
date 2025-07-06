import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Theme from './Theme';

export default function GoogleIcon({ size = 20, style }) {
  return (
    <Text style={[styles.icon, { fontSize: size, width: size, height: size, lineHeight: size }, style]}>
      G
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: 'bold',
    color: '#4285F4',
    backgroundColor: Theme.colors.surface,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
}); 