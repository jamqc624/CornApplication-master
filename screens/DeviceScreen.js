import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from 'expo-linear-gradient'; 

export default function DeviceScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/corn_background.jpg")} 
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.cardContainer}>
            {/* Header Section with lighter background */}
            <View style={styles.headerSection}>
              {/* Top bar for back button and title */}
              <View style={styles.topBar}>
                <TouchableOpacity
                  onPress={() => {
                    if (navigation) navigation.goBack();
                  }}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={28} color="#222" />
                </TouchableOpacity>
                <Text style={styles.title}>DEVICES</Text>
              </View>
            </View>

            {/* Blurred Section for Misting and Pesticide Tanks */}
            <LinearGradient
              colors={['rgb(178, 178, 116)', 'rgba(147, 147, 89, 0.89)', 'rgba(201, 193, 130, 0.83)']} // White/gray blur gradient
              style={styles.blurredTankSection}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
            >
              {/* Misting Water Tank */}
              <View style={styles.deviceSection}>
                <Text style={styles.deviceNameLight}>Misting Water Tank</Text>
                {/* Level Row */}
                <View style={styles.levelRow}>
                  <Text style={styles.labelLight}>Level:</Text>
                  <View style={styles.chipGreen}>
                    <Text style={styles.chipText}>70%</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={22}
                    color="rgb(21, 238, 61)"
                    style={styles.statusIcon}
                  />
                  <Text style={styles.statusGreen}>Ready for misting</Text>
                </View>
                {/* Capacity Row */}
                <View style={styles.capacityRow}>
                  <Text style={styles.labelLight}>Capacity:</Text>
                  <Text style={styles.valueBoldLight}>100 L</Text>
                </View>
              </View>

              {/* Pesticide Water Tank */}
              <View style={styles.deviceSection}>
                <Text style={styles.deviceNameLight}>Pesticide Water Tank</Text>
                {/* Level Row */}
                <View style={styles.levelRow}>
                  <Text style={styles.labelLight}>Level:</Text>
                  <View style={styles.chipYellow}>
                    <Text style={styles.chipText}>50%</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="alert-circle"
                    size={22}
                    color="#ff1744"
                    style={styles.statusIcon}
                  />
                  <Text style={styles.statusRed}>Refill Soon</Text>
                </View>
                {/* Capacity Row */}
                <View style={styles.capacityRow}>
                  <Text style={styles.labelLight}>Capacity:</Text>
                  <Text style={styles.valueBoldLight}>100 L</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Sensors Section with Black Gradient - Now directly follows */}
            <LinearGradient
              colors={['rgba(172, 181, 140, 0.8)', 'rgba(0,0,0,0.95)', 'rgba(0,0,0,0.95)']} // Darker to slightly lighter black
              style={styles.gradientSensorSection}
              start={{ x: 0, y: 1 }} // Top-left
              end={{ x: 1, y: 0 }}   // Bottom-left
            >
              <Text style={styles.sensorTitle}>Ultrasonic Water Level Sensor</Text>
              <Text style={styles.sensorLabel}>
                Tank Level: <Text style={styles.sensorHighlight}>85%</Text>
              </Text>
              <Text style={styles.sensorLabel}>
                Water Tank: <Text style={styles.sensorHighlight}>400 L</Text>
              </Text>
              <Text style={styles.sensorLabel}>
                Distance: <Text style={styles.sensorHighlightBlue}>20 cm from sensor</Text>
              </Text>

              <Text style={styles.sensorTitle}>Water Flow Sensor (YF-S201B)</Text>
              <Text style={styles.sensorLabel}>
                Flow Rate: <Text style={styles.sensorHighlightBlue}>3.8 L/min</Text>
              </Text>
              <Text style={styles.sensorLabel}>
                Total Water Tank Used Today: <Text style={styles.sensorHighlight}>150 L</Text>
              </Text>

              <Text style={styles.sensorTitle}>Solenoid Valve</Text>
              <Text style={styles.sensorLabel}>
                Valve 1: <Text style={styles.sensorHighlightGreen}>ON  </Text>
              </Text>

              <Text style={styles.sensorTitle}>GPS Module (Neo 6M)</Text>
              <Text style={styles.sensorLabel}>
                Libona, Bukidnon Misamis Oriental
              </Text>
              <Text style={styles.sensorHighlightBlue}>
                8.380680°N, 124.704147°E
              </Text>

              <Text style={styles.sensorTitle}>
                DHT22 Temperature & Humidity Sensor
              </Text>
              <Text style={styles.sensorLabel}>
                Temperature: <Text style={styles.sensorHighlight}>24 °C</Text>
              </Text>
              <Text style={styles.sensorLabel}>
                Humidity: <Text style={styles.sensorHighlight}>83%</Text>
              </Text>

              <Text style={styles.sensorTitle}>Wind Sensor (Anemometer)</Text>
              <Text style={styles.sensorLabel}>
                Wind Speed: <Text style={styles.sensorHighlightBlue}>9.7 km/h</Text>
              </Text>
            </LinearGradient>

           
      

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1
  },
  cardContainer: {
    margin: 16,
    marginBottom: 100,
    borderRadius: 32,
    overflow: "hidden",
    elevation: 5,
  },
  headerSection: {
    backgroundColor: "rgba(254, 249, 249, 0.98)",
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#222",
    flex: 1,
    textAlign: 'center',
    marginRight: 28,
  },
  deviceSection: {
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 24,
  },
  deviceNameLight: {
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
    alignSelf: "center",
  },
  labelLight: {
    color: "#fff",
    fontSize: 15,
    marginRight: 10,
    fontWeight: "bold",
    
  },
  valueBoldLight: {
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 9,
  },
  
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center', 
    marginBottom: 5, 
    marginLeft: 20,
  },
  capacityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center', 
    marginRight: 100,
    
  },
  chipGreen: {
    backgroundColor: "rgb(21, 238, 61)",
    width: 35, 
    height: 35,
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center', 
    borderWidth: 1.5,
    borderColor: "#fff",
    marginLeft: 10, 
    marginRight: 10, 
  },
  chipYellow: {
    backgroundColor: "rgb(242, 240, 132)",
    width: 35, 
    height: 35, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1.5,
    borderColor: "#fff",
    marginLeft: 10, 
    marginRight: 10,
  },
  chipText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 15,
  },
  statusIcon: {
    marginLeft: 8,
  },
  statusGreen: {
    color: "rgb(21, 238, 61)",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
  statusRed: {
    color: "#ff1744",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
  gradientSensorSection: {
    paddingTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  sensorTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 19,
    alignSelf: "center",

  },
  sensorLabel: {
    color: "#fff",
    fontSize: 14,
    marginTop: 1,
 
    alignSelf: "center",
  },
  sensorHighlight: {
    color: "#fff",
    fontWeight: "bold",
  },
  sensorHighlightBlue: {
    color: "#00b2ff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  sensorHighlightGreen: {
    color: "rgb(21, 238, 61)",
    fontWeight: "bold",
  },
});
