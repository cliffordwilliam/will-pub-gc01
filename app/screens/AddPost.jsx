import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_POST, POSTS } from "../config/queries";

const AddPost = ({ navigation }) => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      navigation.navigate("Post");
    },
    refetchQueries: [POSTS],
  });
  const [postContent, setPostContent] = useState("");

  const handleAddPost = async () => {
    try {
      await createPost({
        variables: {
          payload: {
            content: postContent,
            tags: null,
            imgUrl: null,
            authorId: "null",
            comments: [],
            likes: [],
            createdAt: null,
            updatedAt: null,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Post</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Post Content"
        value={postContent}
        onChangeText={(text) => setPostContent(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Add Post</Text>
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
  multilineInput: {
    height: 100,
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
});

export default AddPost;
