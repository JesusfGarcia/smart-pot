import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Button({ text, type, onClick, loading = false }) {
  return (
    <TouchableOpacity onPress={onClick}>
      {loading ? (
        <ActivityIndicator size="large" color="#87eba4" />
      ) : (
        <Text style={styles[type]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    display: "flex",
    textAlign: "center",
    backgroundColor: "#87eba4",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  link: {
    color: "#f4f4f4",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
