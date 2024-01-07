import React from "react";
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import SpecifiedView from "../components/SpecifiedView";
import { useQuery } from "@apollo/client";
import { POSTS } from "../config/queries";

const ListPost = ({ navigation }) => {
  const detailOnPress = (postId) => {
    console.log(postId, "ListPost clicked a post");
    navigation.navigate("DetailPost", { postId });
  };

  const { data, loading, error } = useQuery(POSTS);

  // Check for loading and error states
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // Use real data
  const realData = data.posts;

  return (
    <SpecifiedView style={styles.container}>
      <FlatList
        data={realData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => detailOnPress(item._id)}
          >
            <Text style={styles.postTitle}>{item.content}</Text>
            <Text style={styles.timestamp}>{item.createdAt}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </SpecifiedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  timestamp: {
    color: "#777",
  },
});

export default ListPost;
