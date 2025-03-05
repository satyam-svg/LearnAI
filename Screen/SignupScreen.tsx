import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedSafeAreaView } from '@/components/ThemedSafearea';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import CountryPicker from 'react-native-country-picker-modal';
import PinScreen from '../components/PinScreen'
const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [nickName, setNickName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showClassModal, setShowClassModal] = useState(false);
  const [country, setCountry] = useState(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPinScreen, setShowPinScreen] = useState(false);

  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/fonts/ABeeZee-Regular.ttf'),
  });

  const classOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowPinScreen(true); // Show PinScreen component
    }, 1000);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemedSafeAreaView style={styles.container}>

<Modal
        visible={showPinScreen}
        transparent={false}
        animationType="slide"
      >
        <PinScreen />
      </Modal>
      {/* Header */}

      {!showPinScreen && (
        <>
             <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Fill Your Profile</ThemedText>

        {/* Profile Picture */}
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person" size={40} color="white" />
            </View>
          )}
          <View style={styles.editIcon}>
            <Ionicons name="create-outline" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </ThemedView>

      {/* Form Inputs */}
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Full Name */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
        </View>

        {/* Nick Name */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nick Name"
            placeholderTextColor="#aaa"
            value={nickName}
            onChangeText={setNickName}
            style={styles.input}
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="event" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            placeholder="Date of Birth (DD/MM/YYYY)"
            placeholderTextColor="#aaa"
            value={dob}
            onChangeText={setDob}
            style={[styles.input, { paddingLeft: 40, margin: 12 }]}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { paddingLeft: 40, margin: 12 }]}
            keyboardType="email-address"
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={24} color="#aaa" style={styles.icon} />
          <TouchableOpacity
            style={styles.countryCodeContainer}
            onPress={() => setShowCountryPicker(true)}
          >
            <ThemedText style={styles.countryCodeText}>
              {country ? `+${country.callingCode[0]}` : '+91'}
            </ThemedText>
          </TouchableOpacity>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, { paddingLeft: 100 }]}
            keyboardType="phone-pad"
          />
        </View>

        {/* Class Selection */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowClassModal(true)}
        >
          <MaterialIcons name="class" size={24} color="#aaa" style={styles.icon} />
          <ThemedText style={[styles.input, { color: selectedClass ? 'white' : '#aaa',marginTop: 28,marginLeft:30 }]}>
            <ThemedText>Class  {selectedClass || 'Select Class (1-12)'}</ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* Class Selection Modal */}
      <Modal visible={showClassModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={classOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedClass(item);
                    setShowClassModal(false);
                  }}
                >
                  <ThemedText style={styles.modalOptionText}>Class {item}</ThemedText>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Country Picker Modal */}
      <Modal visible={showCountryPicker} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CountryPicker
              withCallingCode
              withFilter
              withFlag
              withEmoji
              onSelect={(country) => {
                setCountry(country);
                setShowCountryPicker(false);
              }}
              onClose={() => setShowCountryPicker(false)}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleContinue}>
          
          <LinearGradient
            colors={['#CA17BC', '#FE1F14', '#FFB800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
        </> 
      )}
      

      {/* Fixed Continue Button */}
      
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20,
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'ABeeZee',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#CA17BC',
    borderRadius: 15,
    padding: 5,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    marginBottom: 15,
    height: 60,
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 16,
    height: '100%',
  },
  icon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  countryCodeContainer: {
    position: 'absolute',
    left: 45,
    zIndex: 1,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#333',
    height: '60%',
    justifyContent: 'center',
  },
  countryCodeText: {
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  gradientButton: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalOptionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignupScreen;