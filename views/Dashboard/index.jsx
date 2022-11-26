import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import Input from "../../components/Input";

import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import Pot from "../../components/Pot";

const initialState = {
  name: "",
  mac: "",
  maxHum: "",
  minHum: "",
};

export default function Dashboard() {
  const [showModal, setModal] = React.useState(false);
  const [pod, setPod] = React.useState(initialState);
  const [potsList, setPotsList] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);

  const onChangeText = (property, value) => {
    setPod({
      ...pod,
      [property]: value,
    });
  };

  const closeModal = () => {
    setPod(initialState);
    setModal(false);
    setIsEdit(false);
  };

  const savePot = async () => {
    try {
      const db = getDatabase();
      const auth = getAuth();
      const user = auth.currentUser;
      await set(ref(db, `usuarios/${user.uid}/macetas/${pod.mac}`), pod);
      if (isEdit) {
        await set(ref(db, `macetas/${pod.mac}/humedad`), {
          max: parseInt(pod.maxHum),
          min: parseInt(pod.minHum),
        });
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const setEdit = async (pod) => {
    setPod(pod);
    setModal(true);
    setIsEdit(true);
  };

  const getPots = async () => {
    try {
      const db = getDatabase();
      const auth = getAuth();
      const user = auth.currentUser;
      const potsRef = ref(db, `usuarios/${user.uid}/macetas`);

      onValue(potsRef, (potsList) => {
        const data = potsList.val();
        const list = [];
        for (let property in data) {
          list.push(data[property]);
        }
        setPotsList(list);
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    getPots();
  }, []);

  return (
    <View style={styles.container}>
      {potsList.map((item, idx) => {
        return (
          <Pot
            mac={item.mac}
            name={item.name}
            minHum={item.minHum}
            maxHum={item.maxHum}
            key={idx}
            edit={() => setEdit(item)}
            delete={() => deletePot(item.mac)}
          />
        );
      })}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              onChange={(text) => onChangeText("name", text)}
              value={pod.name}
              placeholder="Mi Maceta"
              label="Nombre de la maceta"
            />
            <Input
              onChange={(text) => onChangeText("mac", text)}
              value={pod.mac}
              placeholder="00:00:00:00:00:00"
              label="Clave de la maceta"
            />
            <Input
              onChange={(text) => onChangeText("maxHum", text)}
              value={pod.maxHum}
              placeholder="13"
              label="Húmedad Máxima"
            />
            <Input
              onChange={(text) => onChangeText("minHum", text)}
              value={pod.minHum}
              placeholder="0"
              label="Húmedad Mínima"
            />
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={savePot}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FloatingButton onPress={() => setModal(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87ceeb",
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    flex: 1,
  },
  buttonSave: {
    backgroundColor: "#eba487",
    marginLeft: 5,
  },
  buttonClose: {
    backgroundColor: "#eb8787",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
