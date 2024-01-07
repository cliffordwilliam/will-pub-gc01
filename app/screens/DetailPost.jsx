import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import SpecifiedView from "../components/SpecifiedView";
import { useQuery, useMutation } from "@apollo/client";
import { POST, CREATE_LIKE, CREATE_COMMENT } from "../config/queries";

const DetailPost = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const { data, loading, error } = useQuery(POST, {
    variables: {
      postId,
    },
  });

  const [
    CreateLike,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useMutation(CREATE_LIKE, {
    onCompleted: async (res) => {
      console.log(res, "CREATE LIKE");
    },
  });

  const [
    CreateComment,
    {
      data: mutateCommentData,
      loading: mutateCommentLoading,
      error: mutateCommentError,
    },
  ] = useMutation(CREATE_COMMENT, {
    onCompleted: async (res) => {
      console.log(res, "CREATE COMMENT");
    },
  });

  useEffect(() => {
    console.log(data);
    setPost(data?.post || {});
  }, [data]);

  const backOnPress = () => {
    navigation.goBack();
  };

  const addComment = async () => {
    console.log("Add Comment");
    try {
      await CreateComment({
        variables: {
          updatePostCommentId: postId,
          payload: {
            content: commentContent,
            username: "null", // You may replace this with the actual username logic
            createdAt: null,
            updatedAt: null,
          },
        },
      });
      // Reset comment content after submitting
      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    console.log("Like Post");
    try {
      await CreateLike({
        variables: {
          updatePostLikeId: postId,
          payload: {
            username: "null",
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
    <SpecifiedView style={styles.container}>
      <Text style={styles.postId}>Post ID: {post._id}</Text>
      <Text style={styles.postTitle}>Title: {post.content}</Text>
      <Text style={styles.createdAt}>Created At: {post.createdAt}</Text>

      <Text style={styles.likes}>
        Likes:{" "}
        {post.likes?.map((like, index) => (
          <Text key={index}>
            {like.username}
            {index !== post.likes.length - 1 && ", "}
          </Text>
        ))}
      </Text>

      <Text style={styles.comments}>
        Comments:
        {post.comments?.map((comment, index) => (
          <Text key={index}>
            {comment.username}: {comment.content}
            {"\n"}
          </Text>
        ))}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Type your comment..."
        onChangeText={(text) => setCommentContent(text)}
        value={commentContent}
      />

      <TouchableOpacity style={styles.button} onPress={addComment}>
        <View>
          <Text style={styles.buttonText}>Add Comment</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={likePost}>
        <View>
          <Text style={styles.buttonText}>Like</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={backOnPress}>
        <View>
          <Text style={styles.buttonText}>Back</Text>
        </View>
      </TouchableOpacity>
    </SpecifiedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  postId: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  createdAt: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: "100%",
  },
});

export default DetailPost;
