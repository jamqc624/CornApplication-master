import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const { width, height } = Dimensions.get('window');

// Images
const cornBackground = require('../assets/corn_background.jpg');
const cornLogo = require('../assets/logo.png');

export default function MainScreen({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const [mainLoading, setMainLoading] = useState({ login: false, register: false });

  const modalAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showLogin || showRegister) {
      Animated.parallel([
        Animated.timing(modalAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      modalAnim.setValue(0);
      fadeAnim.setValue(0);
    }
  }, [showLogin, showRegister]);

  const handleLoginPress = () => {
    setMainLoading((l) => ({ ...l, login: true }));
    setTimeout(() => {
      setMainLoading((l) => ({ ...l, login: false }));
      setShowLogin(true);
      setCurrentView('login');
    }, 400);
  };

  const handleRegisterPress = () => {
    setMainLoading((l) => ({ ...l, register: true }));
    setTimeout(() => {
      setMainLoading((l) => ({ ...l, register: false }));
      setShowRegister(true);
      setCurrentView('register');
    }, 400);
  };

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(modalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLogin(false);
      setShowRegister(false);
      setCurrentView('main');
    });
  };

  const handleLoginSuccess = () => {
    onLogin();
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
    setCurrentView('login');
  };

  const renderModalContent = () => {
    const isLogin = currentView === 'login';
    const ContentComponent = isLogin ? LoginScreen : RegisterScreen;
    const onSuccess = isLogin ? handleLoginSuccess : handleRegisterSuccess;

    return (
      <ImageBackground source={cornBackground} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: modalAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, 0],
                    }),
                  },
                  {
                    scale: modalAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.8, 1.05, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>✕</Text>
            </TouchableOpacity>
            <ContentComponent onLogin={onSuccess} onRegisterSuccess={onSuccess} />
          </Animated.View>
        </View>
      </ImageBackground>
    );
  };

  if (currentView !== 'main') return renderModalContent();

  return (
    <ImageBackground source={cornBackground} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={cornLogo} style={styles.logo} />
          </View>
          <Text style={styles.title}>CORN MIST</Text>
          <View style={styles.underline} />
          <Text style={styles.tagline}>Mist It Right. Harvest Bright.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLoginPress}
              activeOpacity={0.7}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleRegisterPress}
              activeOpacity={0.7}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 110,
    paddingHorizontal: 24,
  },
  logoContainer: {
    height: 110,
    width: 110,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    marginTop: 3,
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 50,
    marginBottom: 22,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  underline: {
    width: 180,
    height: 2,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  tagline: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.6,
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    gap: 20,
  },
  loginButton: {
    width: width * 0.69,
    paddingVertical: 16,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(99, 99, 99, 0.56)',
    marginTop: 299,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  signupButton: {
    width: width * 0.69,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 190,
  },
  signupButtonText: {
    color: '#193059',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    zIndex: 2,
    height: '100%',
    paddingTop: 32,
  },
  backButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  backButtonText: {
    fontSize: 20,
    color: '#888',
    fontWeight: 'bold',
  },
});
