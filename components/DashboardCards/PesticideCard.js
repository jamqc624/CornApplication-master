import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassCard from '../GlassCard';
import CircularProgress from '../CircularProgress';
import Theme from '../Theme';

export default function PesticideCard() {
  const [mistingHistory, setMistingHistory] = useState([
    'MAY 26 - 10:00 PM',
    'MAY 25 - 8:00 PM',
    'MAY 24 - 9:00 PM',
    'MAY 23 - 11:00 PM',
  ]);

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🐞</Text>
        <Text style={styles.title}>PESTICIDE</Text>
      </View>

      <View style={styles.content}>
        <CircularProgress 
          percentage={50} 
          size={80} 
          strokeWidth={8}
          color={Theme.colors.warning}
        />
        <View style={styles.details}>
          <Text style={styles.detailText}>
            LAST SPRAYED: <Text style={styles.bold}>Today - 7 PM</Text>
          </Text>
          <Text style={styles.detailText}>
            NEXT SCHEDULE: <Text style={styles.bold}>May 27 - 9 PM</Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SET SCHEDULE</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  details: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  detailText: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
    marginBottom: Theme.spacing.xs,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Theme.borderRadius.round,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    alignSelf: 'flex-start',
  },
  buttonText: {
    ...Theme.typography.button,
    fontSize: 14,
    color: Theme.colors.surface,
  },
});
