import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from '../GlassCard';
import Theme from '../Theme';

const LegendItem = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

export default function WaterLevelCard() {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💧</Text>
        <Text style={styles.title}>WATER LEVEL</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.legend}>
          <LegendItem color={Theme.colors.button} label="High" />
          <LegendItem color={Theme.colors.accent} label="Medium" />
          <LegendItem color={Theme.colors.error} label="Low" />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.waterIcon}>💧</Text>
          <Text style={styles.percentage}>85%</Text>
        </View>
      </View>
      <Text style={styles.footerText}>Tank is full</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  legend: {
    gap: Theme.spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Theme.spacing.sm,
  },
  legendLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
  },
  statusContainer: {
    alignItems: 'center',
  },
  waterIcon: {
    fontSize: 64,
    color: Theme.colors.button,
  },
  percentage: {
    ...Theme.typography.h2,
    color: Theme.colors.surface,
    fontWeight: 'bold',
  },
  footerText: {
    ...Theme.typography.body,
    color: Theme.colors.surface,
    textAlign: 'center',
    fontWeight: '600',
  },
}); 