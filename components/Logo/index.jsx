import React from "react";

import Maceta from "../../assets/maceta.png";

import { View, Image, Text, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.logo}>
      <Image style={styles.icon} source={Maceta} />
      <Text style={styles.logoText}>SMART POD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 150,
    width: 100,
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 50,
    letterSpacing: 4,
  },
});
