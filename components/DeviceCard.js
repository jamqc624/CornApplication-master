import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import Theme from './Theme';

const DeviceStatus = ({ status }) => {
  const statusStyles = [
    styles.statusIndicator,
    status === 'Online' ? styles.online : styles.offline,
  ];
  return (
    <View style={styles.statusContainer}>
      <View style={statusStyles} />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

export default function DeviceCard({ device }) {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{device.icon}</Text>
        <View>
          <Text style={styles.title}>{device.name}</Text>
          <Text style={styles.location}>{device.location}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <DeviceStatus status={device.status} />
        <View style={styles.details}>
          <Text style={styles.detailText}>
            ID: <Text style={styles.bold}>{device.id}</Text>
          </Text>
          <Text style={styles.detailText}>
            Last Active: <Text style={styles.bold}>{device.lastActive}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MANAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.removeButton]}>
          <Text style={styles.buttonText}>REMOVE</Text>
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  icon: {
    fontSize: 48,
    marginRight: Theme.spacing.md,
  },
  title: {
    ...Theme.typography.h3,
    color: Theme.colors.surface,
  },
  location: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.pill,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Theme.spacing.sm,
  },
  online: {
    backgroundColor: Theme.colors.success,
  },
  offline: {
    backgroundColor: Theme.colors.error,
  },
  statusText: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
    fontWeight: 'bold',
  },
  details: {
    alignItems: 'flex-end',
  },
  detailText: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
  },
  bold: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.sm,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Theme.borderRadius.round,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  removeButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  buttonText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: Theme.colors.surface,
  },
}); 