import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ListComponent({ title, list, setList }) {
  const [index, setIndex] = useState(0);
  const status = {
    0: ["ellipsis-h", "Pending", "grey"],
    1: ["check-circle", "Completed", "green"],
    2: ["exclamation-circle", "Overdue", "orange"],
  };
  function deleteList() {
    const arr = list.filter((item) => item !== title);
    setList(arr);
  }
  function handlePress() {
    if (index === 2) {
      return setIndex(0);
    }
    setIndex(index + 1);
  }
  return (
    <View style={styles.tile}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title.length > 20 ? `${title.substring(0, 20)}...` : title} (
          {status[index][1]})
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.button, { backgroundColor: status[index][2] }]}
        >
          <FontAwesome name={status[index][0]} size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteList} style={styles.button}>
          <FontAwesome name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttons: {
    flexDirection: "row",
  },
});
