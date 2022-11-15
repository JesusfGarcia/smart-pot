import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import Maceta from "./assets/maceta.png";

export default function App() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onChangeText = (property, text) => {
    setUser({
      ...user,
      [property]: text,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.icon} source={Maceta} />
        <Text style={styles.logoText}>SMART POT</Text>
      </View>

      <View>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          onChangeText={(text) => onChangeText("email", text)}
          style={styles.input}
          value={user.email}
          placeholder="Ingrese Correo electronico"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          onChangeText={(text) => onChangeText("password", text)}
          style={styles.input}
          value={user.password}
          placeholder="Ingrese su contraseña"
          secureTextEntry
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.button}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Aún no tienes cuenta? Registrate aquí!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87ceeb",
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
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
