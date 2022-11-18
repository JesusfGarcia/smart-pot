import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

export default function Login() {
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
      <Logo />
      <View>
        <Input
          onChange={(text) => onChangeText("email", text)}
          value={user.email}
          placeholder="Ingrese Correo electronico"
          label="Correo electrónico"
        />
        <Input
          onChange={(text) => onChangeText("password", text)}
          value={user.password}
          placeholder="Ingrese su contraseña"
          secureTextEntry
          label="Ingrese su contraseña"
        />
      </View>
      <Button type="button" text="Ingresar" />
      <Button type="link" text="Aún no tienes cuenta? Registrate aquí!" />
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
});
