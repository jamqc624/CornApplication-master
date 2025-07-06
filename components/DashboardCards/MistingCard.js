import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Assuming Ionicons are used for dropdown caret

export default function MistingControlPanel({ handleSetSchedule }) {
  // States for Misting Control Panel
  const [setTemperature, setSetTemperature] = useState('35°C');
  const [setHumidity, setSetHumidity] = useState('40%');
  const [setWind, setSetWind] = useState('5 km/h');
  const [selectedArea, setSelectedArea] = useState('Area 1');
  const [duration, setDuration] = useState('5 MINUTES'); // Placeholder for slider value
  const [mistingHistory, setMistingHistory] = useState([
    'MAY 26 - 10:00 AM',
    'MAY 25 - 8:00 AM',
    'MAY 24 - 9:00 AM',
    'MAY 23 - 11:00 AM',
  ]);
  const [mistingTankLevel, setMistingTankLevel] = useState(70); // Assuming 70% as initial value

  return (
    <>
      {/* Blurred Section for Tank Status to Set Wind */}
      <LinearGradient
        colors={['rgb(178, 178, 116)', 'rgba(147, 147, 89, 0.89)', 'rgba(201, 193, 130, 0.83)']} // White/gray blur gradient
        style={styles.blurredTankSection}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <Text style={styles.sectionTitle}>TANK STATUS</Text>
        <View style={styles.progressBarContainer}>
          {/* The green fill for the progress bar */}
          <View style={[styles.progressBarFill, { width: `${mistingTankLevel}%` }]} />
          <Text style={styles.progressBarText}>{mistingTankLevel}%</Text>
        </View>

        <Text style={styles.sectionTitle}>MISTING SCHEDULE</Text>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Set Temperature:</Text>
          <TextInput
            style={styles.inputField}
            value={setTemperature}
            onChangeText={setSetTemperature}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Set Humidity:</Text>
          <TextInput
            style={styles.inputField}
            value={setHumidity}
            onChangeText={setSetHumidity}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Set Wind:</Text>
          <TextInput
            style={styles.inputField}
            value={setWind}
            onChangeText={setSetWind}
            keyboardType="numeric"
          />
        </View>
      </LinearGradient>

      {/* Selected Area - History Section with Black Gradient */}
      <LinearGradient
        colors={['rgba(172, 181, 140, 0.8)', 'rgba(0,0,0,0.95)', 'rgba(0,0,0,0.95)']} // Darker to slightly lighter black
        style={styles.gradientSensorSection}
        start={{ x: 0, y: 1 }} // Top-left
        end={{ x: 1, y: 0 }}   // Bottom-left
      >
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Select Area:</Text>
          <View style={styles.dropdownPlaceholder}>
            <Text style={styles.dropdownText}>{selectedArea}</Text>
            <Ionicons name="caret-down" size={16} color="#000" />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Duration:</Text>
          <View style={styles.durationPlaceholder}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.mistNowButton}>
          <Text style={styles.buttonText}>MIST NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopMistButton}>
          <Text style={styles.buttonText}>STOP MIST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setScheduleButton} onPress={() => handleSetSchedule('misting')}>
          <Text style={styles.buttonText}>SET SCHEDULE</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>HISTORY</Text>
        {mistingHistory.map((item, index) => (
          <Text key={index} style={styles.historyItem}>{item}</Text>
        ))}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  progressBarContainer: {
    width: '90%',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 253, 236, 0.94)', // Light gray for the empty part of the progress bar
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00e676', // Green for 70%
    borderRadius: 10,
  },
  progressBarText: {
    position: 'absolute',
    left: 199,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 15,
    marginLeft:60,
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '50%',
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dropdownPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold'
  },
  durationPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mistNowButton: {
    backgroundColor: '#00e676',
    borderRadius: 10,
    paddingVertical: 10,
    width: '60%',
    alignItems: 'center',
    marginTop: 20,
  },
  stopMistButton: {
    backgroundColor: 'rgba(247, 131, 127, 0.94)',
    borderRadius: 10,
    paddingVertical: 10,
    width: '60%',
    alignItems: 'center',
    marginTop: 10,
  },
  setScheduleButton: {
    backgroundColor: 'rgba(248, 157, 37, 0.94)',
    borderRadius: 10,
    paddingVertical: 10,
    width: '60%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  historyItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  blurredTankSection: {
    width: '90%',
    padding: 10,
    paddingTop: 10,
    marginLeft:20,
    alignItems: 'center',
  },
  gradientSensorSection: {
    width: '90%',
    padding: 10,
    marginLeft:20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
});
