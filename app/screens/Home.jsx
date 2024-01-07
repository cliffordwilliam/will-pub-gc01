import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Home = ({ navigation }) => {
  const { removeTokenLogin } = useContext(LoginContext);
  const handleLogout = async () => {
    console.log("Home screen logout");
    await removeTokenLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#4285f4",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
