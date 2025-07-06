import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Modal, TouchableOpacity, Platform, Image, TextInput } from 'react-native'; // Removed ScrollView, Added TextInput
import ModernButton from '../components/ModernButton'; 
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import pesticideIcon from '../assets/Pesticide.png'; 
import mistingIcon from '../assets/Misting.png'; 
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const bgImage = require('../assets/corn-bg.jpg'); 
const WEATHER_API_KEY = '698df9fdc1634e1bb02135651252006'; 

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduleModal, setScheduleModal] = useState({ visible: false, type: null });
  const [schedule, setSchedule] = useState({ misting: null, pesticide: null });
  const [lastMisted, setLastMisted] = useState(null); 
  const [lastPesticide, setLastPesticide] = useState(null); 
  const [picker, setPicker] = useState({ show: false, mode: 'date', value: new Date() });
  const [tempSchedule, setTempSchedule] = useState(new Date());
  const [cardModal, setCardModal] = useState({ visible: false, type: null });
  const openCardModal = (type) => setCardModal({ visible: true, type });
  const closeCardModal = () => setCardModal({ visible: false, type: null });

  // New states for Misting Control Panel
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

  // State for misting tank level
  const [mistingTankLevel, setMistingTankLevel] = useState(70); // Assuming 70% as initial value


  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied.');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        if (!location || !location.coords) {
          const lastKnown = await Location.getLastKnownPositionAsync();
          if (lastKnown && lastKnown.coords) {
            location = lastKnown;
          } else {
            setError('Unable to determine location.');
            setLoading(false);
            return;
          }
        }

        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=1`;

        const res = await fetch(url);
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (!data?.location || !data?.current) {
            setError('Invalid data from weather API.');
          } else {
            setWeather(data);
          }
        } catch (e) {
          setError('Failed to parse weather data.');
        }

      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSetSchedule = (type) => {
    setScheduleModal({ visible: true, type });
    setTempSchedule(new Date());
  };

  const closeScheduleModal = () => setScheduleModal({ visible: false, type: null });

  const showPicker = (mode) => setPicker({ show: true, mode, value: tempSchedule });

  const onPickerChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setPicker({ ...picker, show: false });
      return;
    }
    setPicker({ ...picker, show: false });
    if (selectedDate) {
      setTempSchedule(selectedDate);
      if (picker.mode === 'date') {
        
        setTimeout(() => showPicker('time'), 200);
      }
    }
  };

  const onTimePickerChange = (event, selectedTime) => {
    if (event.type === 'dismissed') {
      setPicker({ ...picker, show: false });
      return;
    }
    setPicker({ ...picker, show: false });
    if (selectedTime) {
      // Combine selected date and time
      const newDate = new Date(tempSchedule);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setTempSchedule(newDate);
    }
  };

  const saveSchedule = () => {
    const type = scheduleModal.type;
   
    if (type === 'misting') {
        setLastMisted(schedule.misting); // This will be the previous 'next misting' date
    } else if (type === 'pesticide') {
        setLastPesticide(schedule.pesticide); // This will be the previous 'next pesticide' date
    }
    
    setSchedule((prev) => ({ ...prev, [type]: tempSchedule }));
    closeScheduleModal();
  };

  const formatSchedule = (date) => {
    if (!date) return 'Not Scheduled';
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  };

  return (
    <ImageBackground source={bgImage} style={styles.bg} resizeMode="cover">
      <View style={styles.container}> {/* Changed ScrollView to View */}
        {/* Weather Summary */}
        <LinearGradient
          colors={['rgba(161, 159, 159, 0.88)', 'rgba(188, 203, 157, 0.77)']}
          style={styles.weatherCardCompact}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.weatherContent}>
            <View style={styles.weatherLeft}>
              {weather ? (
                <>
                  <View style={styles.locationRow}>
                    <Icon name="map-marker" style={styles.locationIcon} />
                    <Text style={styles.locationText}>{weather.location.name}, {weather.location.region}</Text>
                  </View>
                  <Text style={styles.mainTemp}>{Math.round(weather.current.temp_c)}°</Text>
                  <Text style={styles.weatherDetails}>
                    {new Date(weather.location.localtime).toLocaleDateString('en-US', { weekday: 'long' })} | {weather.current.condition.text}
                  </Text>
                </>
              ) : (
                <Text style={{ color: '#fff' }}>Loading weather...</Text>
              )}
            </View>

            <View style={styles.hourlyForecastContainer}>
              {weather && weather.forecast ? (
                weather.forecast.forecastday[0].hour.slice(11, 14).map((h, i) => (
                  <LinearGradient
                    key={i}
                    colors={['rgba(123, 126, 114, 0.97)', 'rgba(225, 236, 194, 0.97)']}
                    style={styles.hourCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.hourCardTime}>
                      {Platform.OS === 'ios'
                        ? new Date(h.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })
                        : h.time.split(' ')[1].slice(0, 5)}
                    </Text>
                    {/* Use Image for weather icon */}
                    <Image source={{ uri: `https:${h.condition.icon}` }} style={styles.hourCardWeatherIcon} />
                    <Text style={styles.hourCardRainPercentage}>{h.chance_of_rain}%</Text>
                    <Text style={styles.hourCardTemp}>{Math.round(h.temp_c)}°</Text>
                  </LinearGradient>
                ))
              ) : (
                <Text style={{ color: '#fff' }}>Loading forecast...</Text>
              )}
            </View>
          </View>
        </LinearGradient>

          {/* CARDS AT THE HOMESCREEN*/}
        <View style={styles.gridRow}> {/* Added this wrapper View with gridRow style */}
          <View style={styles.gridCol}>
            {/* Misting Card */}
            <TouchableOpacity onPress={() => openCardModal('misting')}>
              <LinearGradient colors={['#0D0D0D', '#675D27']} style={styles.cardCompact}>
                <View style={styles.cardHeaderTop}>
                  <Image source={mistingIcon} style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderTitle}>MISTING</Text>
                  <View style={[styles.cardHeaderPercentageCircle, { backgroundColor: '#00e676' }]}>
                    <Text style={styles.cardHeaderPercentageText}>70%</Text>
                  </View>
                </View>

                <View style={{ width: '100%' }}>
                  <Text style={styles.cardLabel}>
                    LAST MISTED: <Text style={styles.bold}>{formatSchedule(lastMisted)}</Text>
                  </Text>
                  <Text style={styles.cardLabel}>
                    NEXT SCHEDULE: <Text style={styles.bold}>{formatSchedule(schedule.misting)}</Text>
                  </Text>
                </View>

                <ModernButton
                  title="SET SCHEDULE"
                  variant="primary"
                  style={styles.cardButtonCompact}
                  textStyle={{ fontSize: 12 }}
                  onPress={() => handleSetSchedule('misting')}
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* Water Level Card */}
            <TouchableOpacity onPress={() => openCardModal('water')}>
              <LinearGradient colors={['#0D0D0D', '#675D27']} style={styles.cardCompact}>
                <View style={styles.cardHeaderTop}>
                  <Icon name="cup-water" style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderTitle}>WATER LEVEL</Text>
                </View>

                <View style={styles.waterCardRow}>
                  <View style={styles.levelLegend}>
                    <View style={styles.legendItem}>
                      <View style={[styles.dot, { backgroundColor: '#00bfff' }]} />
                      <Text style={styles.legendLabel}>High</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.dot, { backgroundColor: '#ffeb3b' }]} />
                      <Text style={styles.legendLabel}>Medium</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.dot, { backgroundColor: '#f44336' }]} />
                      <Text style={styles.legendLabel}>Low</Text>
                    </View>
                  </View>

                  <View style={styles.waterLevelCenter}>
                    <Icon name="water" style={styles.dropIcon} />
                    <Text style={styles.percentText}>85%</Text>
                  </View>
                </View>

                <Text style={styles.waterStatusText}>Tank is full</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Humidity Card */}
            <TouchableOpacity onPress={() => openCardModal('humidity')}>
              <LinearGradient colors={['#0D0D0D', '#675D27']} style={styles.cardCompact}>
                <View style={styles.cardHeaderTop}>
                  <Icon name="water-percent" style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderTitle}>HUMIDITY</Text>
                </View>
                <Text style={styles.mainPercentageCentered}>
                  {weather ? weather.current.humidity + '%' : '83%'}
                </Text>
                <Text style={styles.cardLabelCentered}>
                  The dew point is {weather ? weather.current.dewpoint_c : '24.1'}°C
                </Text>
                <Text style={styles.cardLabelCentered}>right now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Column 2 */}
          <View style={styles.gridCol}>
            {/* Pesticide Card */}
            <TouchableOpacity onPress={() => openCardModal('pesticide')}>
              <LinearGradient colors={['#0D0D0D', '#675D27']} style={styles.cardCompact}>
                <View style={styles.cardHeaderTop}>
                  <Image source={pesticideIcon} style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderTitle}>PESTICIDE</Text>
                  <View style={[styles.cardHeaderPercentageCircle, { backgroundColor: '#ffc107' }]}>
                    <Text style={styles.cardHeaderPercentageText}>50%</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '120%' }}>
                  <Text style={styles.cardLabel}>
                    LAST SPRAYED: <Text style={styles.bold}>{formatSchedule(lastPesticide)}</Text>
                  </Text>
                </View>

                <Text style={styles.cardLabel}>
                  NEXT SCHEDULE: <Text style={styles.bold}>{formatSchedule(schedule.pesticide)}</Text>
                </Text>

                <ModernButton
                  title="SET SCHEDULE"
                  variant="primary"
                  style={styles.cardButtonCompact}
                  textStyle={{ fontSize: 12 }}
                  onPress={() => handleSetSchedule('pesticide')}
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* Temperature Card */}
            <TouchableOpacity onPress={() => openCardModal('temperature')}>
              <LinearGradient colors={['#0D0D0D', '#675D27']} style={styles.cardCompact}>
                <View style={styles.cardHeaderTop}>
                  <Icon name="thermometer" style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderTitle}>TEMPERATURE</Text>
                </View>
                <Text style={styles.mainTemperatureCentered}>
                  {weather ? Math.round(weather.current.temp_c) + '°' : '26°'}
                </Text>
                <Text style={styles.cardLabelCentered}>No misting needed at</Text>
                <Text style={styles.cardLabelCentered}>this temperature</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Wind Card */}
            <TouchableOpacity onPress={() => openCardModal('wind')}>
              <LinearGradient colors={['#0D0D0D', '#675D27']} style={styles.cardCompact}>
                <View style={styles.cardHeaderTop}>
                  <Icon name="weather-windy" style={styles.cardHeaderIcon} />
                  <Text style={styles.cardHeaderTitle}>WIND</Text>
                </View>
                <View style={styles.windDetailsContainer}>
                  <View style={styles.windSpeedRow}>
                    <Text style={styles.windSpeedText}>
                      {weather ? weather.current.wind_kph : '5.8'}
                    </Text>
                    <Text style={styles.windKmhText}>km/h</Text>
                  </View>
                  <View style={styles.windDirectionContainer}>
                    <Text style={[styles.windDirectionText, { top: 0, left: '50%', transform: [{ translateX: -5 }] }]}>N</Text>
                    <Text style={[styles.windDirectionText, { bottom: 0, left: '50%', transform: [{ translateX: -5 }] }]}>S</Text>
                    <Text style={[styles.windDirectionText, { left: 0, top: '50%', transform: [{ translateY: -10 }] }]}>W</Text>
                    <Text style={[styles.windDirectionText, { right: 0, top: '50%', transform: [{ translateY: -10 }] }]}>E</Text>
                    <View style={styles.windArrowContainer}>
                      <Icon name="arrow-up" style={[styles.windArrow, { transform: [{ rotate: `${weather ? weather.current.wind_degree : 0}deg` }] }]} />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View> {/* End of gridRow wrapper */}
      </View> {/* Changed ScrollView to View */}

        {/* Schedule Modal */}
        <Modal
  visible={scheduleModal.visible}
  transparent
  animationType="fade"
  onRequestClose={closeScheduleModal}
>
  <View style={styles.scheduleModalOverlay}> {/* Changed to scheduleModalOverlay */}
    <View style={[styles.modalCard, styles.scheduleModalCard]}> {/* Apply scheduleModalCard style */}
      {/* Modal Header */}
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Set {scheduleModal.type === 'misting' ? 'Misting' : 'Pesticide'} Schedule</Text>
        <TouchableOpacity onPress={closeScheduleModal}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Date/Time Picker Buttons */}
      <ModernButton
        title="Pick Date"
        onPress={() => showPicker('date')}
        style={styles.pickDateButton} // Applied new style
        textStyle={{ fontSize: 16, color: '#fff' }} // Adjusted text style for button
      />

      <Text style={styles.modalInputText}>
        {tempSchedule
          ? tempSchedule.toLocaleDateString() +
            ' ' +
            tempSchedule.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'No date selected'}
      </Text>

      {/* Save/Cancel Buttons */}
      <TouchableOpacity style={styles.modalSaveButton} onPress={saveSchedule}>
        <Text style={styles.modalSaveText}>Save Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.modalCancelButton} onPress={closeScheduleModal}>
        <Text style={styles.modalCancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* DateTime Picker */}
      {picker.show && (
        <DateTimePicker
          value={picker.value}
          mode={picker.mode}
          is24Hour={true}
          display="spinner" // Changed display to spinner
          onChange={picker.mode === 'date' ? onPickerChange : onTimePickerChange}
          themeVariant="dark" // Added dark theme for iOS
          textColor="#FFD700" // Attempt to change text color (iOS specific)
        />
      )}
    </View>
  </View>
</Modal>

        {/* Modal for Misting, Pesticide, Water Level, Temperature, humidity and wind */}
      
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1, // Changed flexGrow to flex to fill available space without scrolling
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 80,
  },
  weatherCardCompact: {
    width: '99%',
    borderRadius: 28,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(170, 170, 170, 0.91)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  weatherHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  weatherLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 6,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainTemp: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  weatherDetails: {
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    
  },
  hourlyForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 4,
    width: '50%',
  },
  hourCard: {
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    width: 60,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  hourCardTime: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  hourCardWeatherIcon: {
    width: 30,
    height: 25,
    marginBottom: 4,
  },
  hourCardRainPercentage: {
    color: '#009ACD',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  hourCardTemp: {
    color: '#FFF',
    fontSize: 15,
    opacity: 0.85,
  },
  // Cards Grid
  gridRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 1,
    flexWrap: 'wrap',
    marginRight: 8,    
  },
  gridCol: {
    width: '48%',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardCompact: {
    borderRadius: 24,
    padding: 17,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: 'rgb(126, 126, 126)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    height: 170,
    width: '105%',
    
  },
  cardHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  cardHeaderIcon: {
    fontSize: 31,
    color: '#fff',
    width: 28,     
    height: 28,
    resizeMode: 'contain',
    marginRight: 9,
  },
  cardHeaderTitle: {
    fontSize: 19,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  cardHeaderPercentageCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  cardHeaderPercentageText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardPercentageRight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 45,
  },
  cardTitle: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
   
  },
  cardLabel: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 15,
    opacity: 0.90,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  cardLabelCentered: {
    fontSize: 13,
    color: '#fff',
    marginLeft: 5,
    opacity: 0.90,
    textAlign: 'center',
    width: '100%',
  },
  cardContentTopLeft: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  waterStatusTextCentered: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginTop: 5,
  },
  mainPercentageCentered: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    marginBottom: 10,
    marginLeft: 15,
  },
  mainTemperatureCentered: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    marginLeft: 12,
    marginBottom: 19,
  },
  cardButtonCompact: {
    width: '100%',
    paddingVertical: 9,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  // Water Level Card Specific Styles
  waterIconAndPercentageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
  },
  waterPercentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  waterLevelIndicators: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginBottom: 5,
    paddingLeft: 5,
  },
  waterLevelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  waterDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  waterLevelText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 1,
  },
  waterDropIcon: {
    fontSize: 70,
    color: '#00BFFF',
  },
  waterCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  
  levelLegend: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  
  legendLabel: {
    color: '#fff',
    fontSize: 13,
  },
  
  waterLevelCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  percentText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 10,
  },
  
  dropIcon: {
    fontSize: 50,
    color: '#00bfff',
  },
  
  waterStatusText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  
    windSpeedRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 5,
    },
    windSpeedText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: 10,
    },
    windKmhText: {
      fontSize: 14,
      color: '#fff',
      marginLeft: 5,
      marginBottom: 1,
    },
    windDirectionContainer: {
      width: 70,
      height: 70,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      marginBottom: 25,
    
    },
    windDirectionText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 'bold',
      position: 'absolute',
      

    },
    windArrowContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',

      
    },
    windArrow: {
      fontSize: 24,
      color: '#fff',
      position: 'absolute',
      marginBottom: 10,


    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingVertical: 10,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      elevation: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  windDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    color: '#fff',
    fontSize: 32,
  },
  navLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,

  },

  // SET SCHEDULE MODAL DESIGN
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  scheduleModalOverlay: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalCard: { 
    padding: 24, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  scheduleModalCard: { 
    backgroundColor: '#000', 
    width: '80%', 
    height:300, 
    padding: 24,
    borderRadius: 16,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 24, 
  },
  backButton: {
    padding: 5,
  },
  modalInputText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  modalSaveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 4,
    width: '60%',
    alignItems: 'center',
  },
  
  modalSaveText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  modalCancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,

  },
  
  modalCancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
   // DEVICES DESIGN
  statusGreen: {
    color: 'rgb(21, 238, 61)',
    fontWeight: 'bold',
  },
  statusRed: {
    color: '#ff1744',
    fontWeight: 'bold',
  },
  sensorHighlight: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sensorHighlightBlue: {
    color: '#00bfff',
    fontWeight: 'bold',
  },
  sensorHighlightGreen: {
    color: '#00e676',
    fontWeight: 'bold',
  },
  // New styles for gradient sections
  blurredTankSection: {
    width: '100%',
    padding: 24, 
    paddingTop: 10, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  gradientSensorSection: {
    width: '100%',
    
    padding: 24, 
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
   
  },
  pickDateButton: { 
  
    borderRadius: 12,
    paddingVertical: 10,
    width: '50%', 
    alignItems: 'center',
    marginBottom: 12, 
    
    
   
  },
});
