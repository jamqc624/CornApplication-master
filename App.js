import React, { useState } from 'react';
import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // FIXED
  const [showSplash, setShowSplash] = useState(true);
  const [showMain, setShowMain] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setShowMain(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowMain(false); // hide MainScreen
  };

  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SplashScreen onFinish={handleSplashFinish} />
        <StatusBar style="light" />
      </View>
    );
  }

  if (showMain && !isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MainScreen onLogin={handleLoginSuccess} />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppNavigator
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <StatusBar style="light" />
    </View>
  );
}
