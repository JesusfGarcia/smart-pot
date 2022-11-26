import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { getDatabase, ref, onValue } from "firebase/database";

export default function Pot({ mac, name, maxHum, minHum }) {
  const [humedad, setHumedad] = React.useState({
    actual: 0,
    max: 0,
    min: 0,
  });

  const getData = async () => {
    try {
      const db = getDatabase();
      const pot = ref(db, `macetas/${mac}`);

      onValue(pot, (myPot) => {
        const data = myPot.val();
        setHumedad(data.humedad);
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View>
        <Text>{`Nivel de Humedad`}</Text>
        <Text>{`${parseFloat(humedad.actual).toFixed(2)}%`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9d6d5a",
    marginBottom: 10,
  },
});
