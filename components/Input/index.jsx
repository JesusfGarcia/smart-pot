import React from "react";

import { TextInput, StyleSheet, View, Text } from "react-native";

export default function Input({
  onChange,
  value = "",
  placeholder = "",
  secureTextEntry = false,
  label = "",
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        style={styles.input}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eba487",
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
