import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import homeIcon from '../assets/Home.png';
import deviceIcon from '../assets/Devices.png';
import settingIcon from '../assets/Setting.png';
import logo from '../assets/logo.png';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DeviceScreen from '../screens/DeviceScreen';
import SettingScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Bottom Navigation Bar

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconSource;
        if (route.name === 'Home') {
          iconSource = homeIcon;
        } else if (route.name === 'Devices') {
          iconSource = deviceIcon;
        } else if (route.name === 'Settings') {
          iconSource = settingIcon;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={isFocused ? styles.navItemActive : styles.navItem}
          >
            <Image source={iconSource} style={[styles.icon, isFocused && { tintColor: '' }]} />
            <Text style={isFocused ? styles.navLabelActive : styles.navLabel}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


// Main Tabs with custom tab bar
function MainTabs({ setIsAuthenticated }) {
  return (
<Tab.Navigator
  tabBar={props => <CustomTabBar {...props} />}
  screenOptions={{
    headerShown: true,
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={logo}
          style={{ width: 32, height: 32, resizeMode: 'contain', marginLeft: 110 }}
        />
        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>
          CORN MIST
        </Text>
      </View>
    ),
    headerStyle: { backgroundColor: '#000' },
    headerTitleStyle: { color: '#fff' },
    headerTintColor: '#000',
    headerRight: () => (
      <TouchableOpacity
        onPress={() => setIsAuthenticated(false)}
        style={{ marginRight: 16 }}
      >
        <MaterialCommunityIcons name="logout" size={26} color="#fff" />
      </TouchableOpacity>
    ),
  }}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Devices" component={DeviceScreen} />
  <Tab.Screen name="Settings" component={SettingScreen} />
</Tab.Navigator>
);
}


// Main App Navigator
export default function AppNavigator({ isAuthenticated, setIsAuthenticated }) {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="MainScreen">
          {() => <MainTabs setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="LoginScreen">
            {props => (
              <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    backgroundColor: 'rgba(92, 92, 59, 0.92)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#333',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 22 },
    shadowRadius: 18,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
  icon: {
    width: 52,
    height: 52,
 
 
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 18,
    marginHorizontal: 4,
    paddingVertical: 6,
  },
  navLabel: {
    color: '#fff',
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.85,
  },
  navLabelActive: {
    color: '#FFD700',
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 15,
  },
});