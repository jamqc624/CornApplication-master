import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from './GlassCard';
import Theme from './Theme';

export default function SettingsItem({ item }) {
  const [isEnabled, setIsEnabled] = React.useState(item.value);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <GlassCard style={styles.container}>
      <View style={styles.content}>
        <Ionicons name={item.icon} size={24} color={Theme.colors.surface} style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
        {item.type === 'toggle' && (
          <Switch
            trackColor={{ false: 'rgba(255,255,255,0.2)', true: Theme.colors.primary }}
            thumbColor={isEnabled ? Theme.colors.surface : Theme.colors.surface}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        )}
        {item.type === 'button' && (
          <TouchableOpacity onPress={item.onPress}>
            <Ionicons name="chevron-forward" size={24} color={Theme.colors.surface} />
          </TouchableOpacity>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm, // Less padding for list items
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: Theme.spacing.md,
  },
  title: {
    ...Theme.typography.body,
    color: Theme.colors.surface,
    flex: 1,
  },
}); 