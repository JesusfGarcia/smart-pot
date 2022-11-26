import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextError from "../../components/TextError";

export default function Registre({ navigation }) {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onChangeText = (property, text) => {
    setUser({
      ...user,
      [property]: text,
    });
  };

  const signUp = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      alert("Registro exitoso");
      navigation.navigate("Login");
    }
  }, [isSuccess]);

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
      <TextError error={error} />
      <Button
        loading={loading}
        onClick={signUp}
        type="button"
        text="Registrarme"
      />
      <Button
        onClick={() => navigation.navigate("Login")}
        type="link"
        text="Ya tienes una cuenta? Ingresa aquí!"
      />
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
  error: {
    color: "#d44343",
  },
});
