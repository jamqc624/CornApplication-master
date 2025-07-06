import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from '../GlassCard';
import Theme from '../Theme';

export default function TemperatureCard() {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🌡️</Text>
        <Text style={styles.title}>TEMPERATURE</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.temperature}>24°</Text>
      </View>
      <Text style={styles.footerText}>No misting needed at this temperature</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: Theme.spacing.sm,
  },
  title: {
    ...Theme.typography.h3,
    color: Theme.colors.surface,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Theme.spacing.md,
  },
  temperature: {
    ...Theme.typography.h1,
    fontSize: 64,
    color: Theme.colors.surface,
    fontWeight: 'bold',
  },
  footerText: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
    textAlign: 'center',
  },
}); 