import React, { useState } from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  ListItem,
  Avatar,
  useMedia,
  Sheet,
} from "tamagui";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Thư viện icon
import { tx } from "../../../i18n/i18n"; // Import bản dịch
import Dropdown from "@/components/ui/Dropdown";

// Dummy data: Danh sách các cuộc trò chuyện
const conversations = [
  {
    id: "1",
    name: "Alice",
    lastMessage: "Hello! How are you?",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    name: "Bob",
    lastMessage: "See you later!",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    name: "Charlie",
    lastMessage: "Let’s meet tomorrow.",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    timestamp: "2 days ago",
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const media = useMedia();

  // Function to navigate to All Friends screen
  const goToAllFriends = () => {
    // router.push("/chat/friends/all");
  };

  // Function to navigate to Add Friend screen
  const goToAddFriend = () => {
    router.push("/friends");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: tx("messages.title"),
          headerRight: () => (
            <XStack gap={media.xs ? "$3" : "$4"}>
              {/* Icon: All Friends */}
              <Button
                icon={<Ionicons name="people" size={24} color="$primary" />}
                onPress={goToAllFriends}
                backgroundColor="transparent"
              />

              {/* Open Sheet */}
              {/* <Button
                icon={
                  <Ionicons name="add-outline" size={24} color="$primary" />
                }
                onPress={() => setIsSheetOpen(true)}
                backgroundColor="transparent"
              /> */}
              {/* Dropdown */}
              <Dropdown
                icon="add-outline"
                options={[
                  {
                    label: "Add Friend",
                    icon: "person-add-outline",
                    onPress: goToAddFriend,
                  },
                  {
                    label: "Start Group Chat",
                    icon: "people-outline",
                    onPress: () => {},
                  },
                ]}
              />
            </XStack>
          ),
          // headerShown: false
        }}
      />

      <YStack flex={1} backgroundColor="$background">
        {/* Body: List of conversations */}
        <YStack flex={1} padding={media.xs ? "$4" : "$6"} gap="$3">
          {conversations.map((conversation) => (
            <ListItem
              key={conversation.id}
              // onPress={() => router.push(`/chat/messages/${conversation.id}`)} // Navigate to chat screen
              hoverTheme
              pressTheme
              padding={media.xs ? "$3" : "$4"}
              borderRadius="$3"
            >
              {/* Avatar */}
              <Avatar circular size={media.xs ? "$4" : "$6"}>
                <Avatar.Image src={conversation.avatarUrl} />
                <Avatar.Fallback backgroundColor="$primary" />
              </Avatar>

              {/* Content */}
              <YStack flex={1} marginLeft="$3">
                <Text
                  fontSize={media.xs ? "$4" : "$5"}
                  fontWeight="bold"
                  color="$color"
                >
                  {conversation.name}
                </Text>
                <Text fontSize={media.xs ? "$3" : "$4"} color="$secondary">
                  {conversation.lastMessage}
                </Text>
              </YStack>

              {/* Timestamp */}
              <Text fontSize={media.xs ? "$2" : "$3"} color="$secondary">
                {conversation.timestamp}
              </Text>
            </ListItem>
          ))}
        </YStack>
      </YStack>
    </>
  );
}
