import React from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { ListItem, Avatar } from "react-native-elements"

export const ChatHomeScreen = ({ navigation }) => {
  const users = [
    { id: "1", name: "Alice", avatar: "https://example.com/avatar1.jpg" },
    { id: "2", name: "Bob", avatar: "https://example.com/avatar2.jpg" },
    // Thêm người dùng khác
  ]

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <Avatar source={{ uri: item.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat", { userId: item.id })}
              style={{
                backgroundColor: "#007bff",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("VideoCall", { userId: item.id })}
              style={{
                backgroundColor: "#28a745",
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Call</Text>
            </TouchableOpacity>
          </ListItem>
        )}
      />
    </View>
  )
}
