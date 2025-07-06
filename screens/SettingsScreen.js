import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingScreen() {
  const [systemStatus, setSystemStatus] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [securityModalVisible, setSecurityModalVisible] = useState(false);

  // Edit Profile States
  const [name, setName] = useState('Jam Quijano');
  const [email, setEmail] = useState('jquijanon@email.com');
  const [phone, setPhone] = useState('09123456789');

  // Password Change States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Security & Privacy States
  const [twoFactor, setTwoFactor] = useState(false);

  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/corn_background.jpg')} style={styles.bg}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.settingCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="arrow-back" size={24} color="#fff" style={styles.backArrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Settings</Text>
          </View>

          {/* System Toggle */}
          <SettingToggle
            label="Show System Status"
            sub="Display current data from sensors"
            value={systemStatus}
            onValueChange={setSystemStatus}
          />

          {/* Account Settings */}
          <View style={styles.accountSection}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <TouchableOpacity style={styles.accountItem} onPress={() => setEditModalVisible(true)}>
              <Text style={styles.accountText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.accountItem}
              onPress={() => setPasswordModalVisible(true)}
            >
              <Text style={styles.accountText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.accountItem}
              onPress={() => setSecurityModalVisible(true)}
            >
              <Text style={styles.accountText}>Security & Privacy</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

     

        </View>
      </SafeAreaView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              placeholderTextColor="#ccc"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email Address"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone Number"
              placeholderTextColor="#ccc"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.modalSaveButton} onPress={() => setEditModalVisible(false)}>
              <Text style={styles.modalSaveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal visible={passwordModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity onPress={() => setPasswordModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Old Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="New Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TouchableOpacity style={styles.modalSaveButton} onPress={() => setPasswordModalVisible(false)}>
              <Text style={styles.modalSaveText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Security & Privacy Modal */}
      <Modal visible={securityModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Security & Privacy</Text>
              <TouchableOpacity onPress={() => setSecurityModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={{ color: '#fff', marginBottom: 10 }}>
              Enable Two-Factor Authentication
            </Text>
            <TouchableOpacity
              onPress={() => setTwoFactor(!twoFactor)}
              style={[
                styles.toggleBtn,
                { backgroundColor: twoFactor ? '#00ff90' : '#888' },
              ]}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>
                {twoFactor ? 'Enabled' : 'Disabled'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalSaveButton} onPress={() => setSecurityModalVisible(false)}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

function SettingToggle({ label, sub, value, onValueChange }) {
  return (
    <View style={styles.settingRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      <TouchableOpacity onPress={() => onValueChange(!value)}>
        <View
          style={{
            width: 40,
            height: 24,
            borderRadius: 12,
            backgroundColor: value ? '#00ff90' : '#888',
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#fff',
              alignSelf: value ? 'flex-end' : 'flex-start',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
  },
  safe: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  settingCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.79)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backArrowIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 101,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,

  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  sub: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  accountSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  accountText: {
    fontSize: 15,
    color: '#fff',
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  modalSaveButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  modalSaveText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  toggleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
});
