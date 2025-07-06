import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from '../GlassCard';
import Theme from '../Theme';

const WeatherIcon = ({ icon, size = 64 }) => (
  <Text style={{ fontSize: size }}>{icon}</Text>
);

const HourlyForecast = ({ time, icon, temp, rain }) => (
  <View style={styles.hourlyContainer}>
    <Text style={styles.hourlyTime}>{time}</Text>
    <WeatherIcon icon={icon} size={32} />
    <Text style={styles.hourlyRain}>{rain}</Text>
    <Text style={styles.hourlyTemp}>{temp}°</Text>
  </View>
);

export default function WeatherCard() {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.mainWeather}>
        <View>
          <Text style={styles.location}>📍 Libona, Bukidnon</Text>
          <View style={styles.tempContainer}>
            <WeatherIcon icon="☁️" />
            <Text style={styles.temperature}>24°</Text>
          </View>
          <Text style={styles.weatherCondition}>Monday | Heavy Rain</Text>
        </View>
        <View style={styles.hourlyForecast}>
          <HourlyForecast time="11 AM" icon="🌦️" temp="20" rain="63%" />
          <HourlyForecast time="12 PM" icon="🌦️" temp="22" rain="53%" />
          <HourlyForecast time="1 PM" icon="🌦️" temp="24" rain="45%" />
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  mainWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    ...Theme.typography.h1,
    fontSize: 56,
    color: Theme.colors.surface,
    marginLeft: Theme.spacing.sm,
  },
  weatherCondition: {
    ...Theme.typography.body,
    color: Theme.colors.surface,
    fontWeight: '500',
  },
  hourlyForecast: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  hourlyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.sm,
    alignItems: 'center',
    minWidth: 60,
  },
  hourlyTime: {
    ...Theme.typography.caption,
    color: Theme.colors.surface,
    fontWeight: 'bold',
  },
  hourlyRain: {
    ...Theme.typography.caption,
    color: Theme.colors.accent,
    fontWeight: 'bold',
  },
  hourlyTemp: {
    ...Theme.typography.body,
    color: Theme.colors.surface,
    fontWeight: 'bold',
  },
}); 