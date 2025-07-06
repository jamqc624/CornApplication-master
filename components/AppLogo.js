import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Theme from './Theme';

export default function AppLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.logoBackground}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  logoBackground: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.medium,
  },
  logo: { 
    width: 80, 
    height: 80,
  },
}); 