import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextError from "../../components/TextError";

import { authContext } from "../../App";

export default function Login({ navigation }) {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { changeUser } = React.useContext(authContext);

  const onChangeText = (property, text) => {
    setUser({
      ...user,
      [property]: text,
    });
  };

  const SignIn = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      changeUser(response.user);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
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
      <TextError error={error} />
      <Button
        onClick={SignIn}
        loading={isLoading}
        type="button"
        text="Ingresar"
      />
      <Button
        onClick={() => navigation.navigate("Registro")}
        type="link"
        text="Aún no tienes cuenta? Registrate aquí!"
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
});
