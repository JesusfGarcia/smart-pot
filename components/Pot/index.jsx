import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { getDatabase, ref, onValue } from "firebase/database";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Pot({ mac, name, edit }) {
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
        if (data) {
          setHumedad(data.humedad);
        }
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.iconContainer}>
          <AntDesign onPress={edit} name="edit" size={24} color="#9d6d5a" />
        </View>
      </View>
      <View style={styles.humContainer}>
        <Entypo name="drop" size={40} color="#004e98" />
        <Text style={{ color: "#004e98" }}>{`${parseFloat(
          humedad.actual
        ).toFixed(2)}%`}</Text>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9d6d5a",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
  },
  humContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
