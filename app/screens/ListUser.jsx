import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "../config/queries";

const ListUser = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [getUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS);

  const navigateToUserProfile = (id) => {
    navigation.navigate("DetailUser", { id });
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigateToUserProfile(item._id)}
    >
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  const searchUsers = () => {
    getUsers({
      variables: {
        query: search,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Users</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <TouchableOpacity style={styles.button} onPress={searchUsers}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      {!loading && !error && data && (
        <FlatList
          data={data.searchUsers}
          keyExtractor={(item) => item._id}
          renderItem={renderUserItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  userItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 16,
  },
  username: {
    fontSize: 18,
  },
});

export default ListUser;
