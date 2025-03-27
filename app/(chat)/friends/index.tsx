import React, { useState } from "react";
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  ListItem,
  Avatar,
  useMedia,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { authStore } from "@/stores/authStore";
import { addFriend, searchUsers } from "@/service/userService";

export default function AddFriendScreen() {
  const media = useMedia();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const currentUser = authStore.user;

  // Hàm xử lý tìm kiếm người dùng
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const results = await searchUsers(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  // Hàm xử lý thêm bạn
  const handleAddFriend = async (friendUid: string) => {
    if (!currentUser) return;
    try {
      await addFriend(currentUser.uid, friendUid);
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to send friend request.");
    }
  };

  return (
    <>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "Add Friend",
          headerRight: () => (
            <Button
              icon={
                <Ionicons name="close-outline" size={24} color="$primary" />
              }
              onPress={() => router.back()}
              backgroundColor="transparent"
            />
          ),
        }}
      />

      {/* Body */}
      <YStack flex={1} backgroundColor="$background" padding="$4" space="$4">
        {/* Search Bar */}
        <XStack alignItems="center" space="$3">
          <Input
            flex={1}
            placeholder="Search by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            backgroundColor="$backgroundHover"
            padding="$3"
            borderRadius="$4"
          />
          <Button
            icon={<Ionicons name="search-outline" size={24} color="$primary" />}
            onPress={handleSearch}
            backgroundColor="transparent"
          />
        </XStack>

        {/* Search Results */}
        <YStack flex={1} space="$3">
          {searchResults.length === 0 ? (
            <Text textAlign="center" color="$secondary">
              No results found.
            </Text>
          ) : (
            searchResults.map((user) => (
              <ListItem
                key={user.uid}
                hoverTheme
                pressTheme
                padding="$4"
                borderRadius="$4"
              >
                {/* Avatar */}
                <Avatar circular size={media.xs ? "$4" : "$6"}>
                  <Avatar.Image src={user.photoURL || undefined} />
                  <Avatar.Fallback backgroundColor="$primary" />
                </Avatar>

                {/* Content */}
                <YStack flex={1} marginLeft="$3">
                  <Text fontSize={media.xs ? "$4" : "$5"} fontWeight="bold">
                    {user.displayName}
                  </Text>
                  <Text fontSize={media.xs ? "$3" : "$4"} color="$secondary">
                    {user.email}
                  </Text>
                </YStack>

                {/* Add Friend Button */}
                <Button
                  onPress={() => handleAddFriend(user.uid)}
                  backgroundColor="$primary"
                  padding="$3"
                  borderRadius="$4"
                >
                  <Text color="$color">Add</Text>
                </Button>
              </ListItem>
            ))
          )}
        </YStack>
      </YStack>
    </>
  );
}
