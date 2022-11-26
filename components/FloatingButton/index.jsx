import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FloatingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: "#eba487",
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  text: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
