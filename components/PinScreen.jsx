import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const PinScreen = () => {
  const [pin, setPin] = useState("");

  const handlePress = (value) => {
    if (value === "back") {
      setPin(pin.slice(0, -1)); // Remove last digit
    } else if (pin.length < 4) {
      setPin(pin + value); // Append digit
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Create New PIN</Text>
      </View>

      {/* Instruction */}
      <Text style={styles.subtitle}>
        Add a PIN number to make your account more secure
      </Text>

      {/* PIN Input Boxes */}
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinBox,
              pin.length === index && styles.activePinBox, // Highlight active box
            ]}
          >
            <Text style={styles.pinText}>
              {pin[index] ? (index === pin.length - 1 ? pin[index] : "•") : ""}
            </Text>
          </View>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        disabled={pin.length < 4}
      >
        <LinearGradient
          colors={["#CA17BC", "#FE1F14", "#FFB800"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, pin.length < 4 && { opacity: 0.5 }]}
        >
          <Text style={styles.buttonText}>Continue →</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Custom Numeric Keyboard */}
      <View style={styles.keyboard}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "back"].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handlePress(num)}
          >
            <Text style={styles.keyText}>
              {num === "back" ? "⌫" : num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    width: "90%",
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#AAA",
    textAlign: "center",
    marginBottom: 120,
    fontSize: 13,
    
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  pinBox: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  activePinBox: {
    borderColor: "#CA17BC", // Highlight active PIN box
  },
  pinText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 40,
  },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  keyboard: {
    width: "90%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20, // Shifted keyboard lower
  },
  key: {
    width: 70,
    height: 70,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
  },
  keyText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default PinScreen;