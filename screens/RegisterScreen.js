import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const cornBackground = require('../assets/corn_background.jpg');
const googleIcon = require('../assets/google.png');
const xIcon = require('../assets/x.png');
const facebookIcon = require('../assets/facebook.png');
const eyeIcon = require('../assets/eye.png');
const eyeOffIcon = require('../assets/eye-off.png');

export default function RegisterScreen(props) {
  const { navigation } = props;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={cornBackground}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
              <Text style={styles.title}>Sign-Up</Text>
              <Text style={styles.subtitle}>Welcome new user!</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder=""
                  placeholderTextColor="#fff"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder=""
                  placeholderTextColor="#fff"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholder=""
                    placeholderTextColor="#fff"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(prev => !prev)}
                  >
                    <Image
                      source={showPassword ? eyeIcon : eyeOffIcon}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder=""
                    placeholderTextColor="#fff"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(prev => !prev)}
                  >
                    <Image
                      source={showConfirmPassword ? eyeIcon : eyeOffIcon}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Link */}
              <View style={styles.loginRow}>
                <Text style={styles.loginText}>Existing user? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>

           {/* Sign-Up Button with validation */}
           <TouchableOpacity
  style={styles.signupButton}
  onPress={() => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Placeholder for backend/API logic
    alert('Account created successfully!');
    setTimeout(() => {
    navigation.navigate('LoginScreen');
  }, 100);
  }}
>
  <Text style={styles.signupText}>Sign up</Text>
  <View style={styles.arrowCircle}>
    <Text style={styles.arrowText}>{'>'}</Text>
  </View>

</TouchableOpacity>


              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Login */}
              <Text style={styles.socialText}>
                Sign up using{'\n'}social media accounts
              </Text>
              <View style={styles.socialRow}>
                <TouchableOpacity>
                  <Image source={googleIcon} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={xIcon} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={facebookIcon} style={styles.socialIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#000',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  inputLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 8,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD600',
    color: '#fff',
    fontSize: 17,
    backgroundColor: '#111',
    marginTop: 2,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 6,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  loginRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 20,
  },
  loginText: {
    color: '#aaa',
    fontSize: 14,
  },
  loginLink: {
    color: '#FFD600',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 32,
    backgroundColor: '#000',
    marginBottom: 2,
  },
  signupText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 12,
  },
  arrowCircle: {
    backgroundColor: '#FFD600',
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 23,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  orText: {
    color: '#fff',
    marginHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 15,
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 1,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  socialIcon: {
    width: 44,
    height: 44,
  },
});
