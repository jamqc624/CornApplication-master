import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from '../GlassCard';
import Theme from '../Theme';

export default function WindCard() {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💨</Text>
        <Text style={styles.title}>WIND</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.compassContainer}>
          <Text style={[styles.direction, styles.north]}>N</Text>
          <Text style={[styles.direction, styles.east]}>E</Text>
          <Text style={[styles.direction, styles.south]}>S</Text>
          <Text style={[styles.direction, styles.west]}>W</Text>
          <View style={styles.center}>
            <Text style={styles.speed}>9.7</Text>
            <Text style={styles.unit}>km/h</Text>
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  direction: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
    position: 'absolute',
    fontWeight: 'bold',
  },
  north: { top: 5, },
  east: { right: 5, },
  south: { bottom: 5, },
  west: { left: 5, },
  center: {
    alignItems: 'center',
  },
  speed: {
    ...Theme.typography.h2,
    color: Theme.colors.surface,
  },
  unit: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
  },
}); 