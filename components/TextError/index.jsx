import React from "react";

import { Text, StyleSheet } from "react-native";

export default function TextError({ error }) {
  return <>{error && <Text style={styles.error}>{error}</Text>}</>;
}

const styles = StyleSheet.create({
  error: {
    color: "#d44343",
  },
});
