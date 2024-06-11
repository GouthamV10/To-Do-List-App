import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ListComponent from "./ListComponent";

export default function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);

  function handleAdd() {
    if (value !== "") {
      let arr = [...list, value];
      setList(arr);
      setValue("");
      setModal(false);
    }
  }

  function openModel() {
    setModal(true);
  }

  function cancel() {
    setValue("");
    setModal(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.heading}>To Do List</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.main}>
          {list.length === 0 ? (
            <Text style={styles.none}>
              No tasks yet. Click to add a new task
            </Text>
          ) : (
            list.map((item, index) => (
              <ListComponent
                key={index}
                title={item}
                list={list}
                setList={setList}
              />
            ))
          )}
        </View>
      </ScrollView>
      {modal && (
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Enter Task</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={styles.modalInput}
            multiline={true}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={cancel}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd}>
              <Text style={styles.modalButton}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={openModel}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    right: 30,
    bottom: 30,
  },
  addButtonText: {
    color: "black",
  },
  main: {
    paddingTop: 10,
  },
  heading: {
    fontSize: 34,
    color: "white",
    textAlign: "center",
    paddingTop: 40,
    letterSpacing: 1,
    elevation: 5,
    marginBottom: 30,
  },
  none: {
    color: "white",
    textAlign: "center",
  },

  modal: {
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.85,
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    transform: [{ translateY: -50 }],
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalButton: {
    color: "#17A",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  modalHeading: {
    fontSize: 24,
    marginBottom: 10,
  },
});
