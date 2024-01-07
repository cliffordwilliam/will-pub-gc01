import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SpecifiedView from "../components/SpecifiedView";
import { useQuery, useMutation } from "@apollo/client";
import { USER, CREATE_FOLLOW } from "../config/queries";

const DetailUser = ({ route, navigation }) => {
  const { id } = route.params;
  const [user, setUser] = useState({});
  const { data, loading, error } = useQuery(USER, {
    variables: {
      userId: id,
    },
  });

  const [
    CreateFollow,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useMutation(CREATE_FOLLOW, {
    onCompleted: async (res) => {
      console.log(res, "ADD FOLLOW");
    },
  });

  useEffect(() => {
    setUser(data?.user || {});
    console.log(data);
    // {"user": {"__typename": "UserFollowOutput", "_id": "6595f95fdb782e2aeb55e18f", "email": "jupp@mail.com", "follower": [[Object], [Object]], "following": [[Object]], "name": "jupp", "password": null, "username": "nitro"}}
  }, [data]);

  const toggleFollow = async () => {
    // setIsFollowing(!isFollowing);
    // console.log(isFollowing);
    try {
      await CreateFollow({
        variables: {
          payload: {
            followingId: id,
            followerId: "null",
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
      <Text style={styles.userId}>User ID: {user._id}</Text>
      <Text style={styles.username}>Username: {user.username}</Text>
      <Text style={styles.email}>Email: {user.email}</Text>

      <Text style={styles.followText}>
        Followers:{" "}
        {user.follower?.map((follower) => follower.username).join(", ") ||
          "None"}
      </Text>
      <Text style={styles.followText}>
        Following:{" "}
        {user.following?.map((following) => following.username).join(", ") ||
          "None"}
      </Text>

      {/* kasih liat namanya jga nih */}
      {/* <Text style={styles.followText}>
        Followers: {user.follower?.length || 0}
      </Text>
      <Text style={styles.followText}>
        Following: {user.following?.length || 0}
      </Text> */}

      <TouchableOpacity style={styles.followButton} onPress={toggleFollow}>
        <View>
          <Text style={styles.buttonText}>Follow</Text>
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
  userId: {
    fontSize: 18,
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    marginBottom: 16,
  },
  followButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  followText: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default DetailUser;
