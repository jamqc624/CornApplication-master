import React, { useState } from 'react';
import {View, Text,TextInput,StyleSheet,TouchableOpacity,Image,SafeAreaView,KeyboardAvoidingView,Platform,ScrollView,
} from 'react-native';



const logo = require('../assets/logo.png');
const googleIcon = require('../assets/google.png');
const xIcon = require('../assets/x.png');
const facebookIcon = require('../assets/facebook.png');
const eyeIcon = require('../assets/eye.png');
const eyeOffIcon = require('../assets/eye-off.png');

export default function LoginScreen({ onLogin, onBack, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
        
        contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* Back Button */}
         
          {/* Card */}
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
            </View>
            {/* Title and Subtitle */}
            <Text style={styles.title}>Log-in</Text>
            <Text style={styles.subtitle}>please login to continue</Text>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>E Mail</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#fff"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder=""
                  placeholderTextColor="#fff"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
               <TouchableOpacity
  style={styles.eyeButton}
  onPress={() => setShowPassword(v => !v)}
>
  <Image
    source={showPassword ? eyeIcon : eyeOffIcon}
    style={{ width: 24, height: 24, tintColor: '#fff' }}
  />
</TouchableOpacity>
              </View>
            </View>
            {/* Forgot Password */}
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotText}>forgot password??</Text>
            </TouchableOpacity>
            {/* Log in Button */}
            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
              <Text style={styles.loginButtonText}>Log in</Text>
              <View style={styles.loginButtonCircle}>
                <Text style={styles.loginButtonArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>
            {/* Social Login */}
            <Text style={styles.socialText}>Login using{'\n'}social media accounts</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,   
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
    maxWidth: 400,
    paddingTop: 100,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 12,
    shadowColor: '#fff',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 5 },
    elevation: 8,
  },
  logoContainer: {
    position: 'absolute',
    top: -90,
    alignSelf: 'center',
    borderRadius: 64,
    padding: 1, 
  },
  logo: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    alignSelf: 'flex-start',
    marginBottom: 18,
    marginTop: 2,
    fontWeight: '500',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 12,
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
    marginTop: 0,
  },
  eyeButton: {
    padding: 8,
    marginLeft: -40,
    zIndex: 1,
  },
  forgotText: {
    color: '#fff',
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginBottom: 8,
    marginTop: 2,
    fontWeight: '500',
    fontSize: 14,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#111',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 22,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#FFD600',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 12,
  },
  loginButtonCircle: {
    backgroundColor: '#FFD600',
    width: 28,
    height: 28,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonArrow: {
    color: '#000',
    fontWeight: 'bold',
    fontSize:23,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  orText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 12,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  socialText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
    opacity: 0.95,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    width: '100%',
    marginTop: 0,
  },
  socialIcon: {
    width: 46,
    height: 46,
    marginHorizontal: 9,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
