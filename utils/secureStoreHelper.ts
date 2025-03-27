import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "../constants/secureStoreKeys";
import { Platform } from "react-native";

// Hàm lưu item vào SecureStore
export const setSecureItem = async (key: SecureStoreKey, value: string) => {
  try {
    if (Platform.OS === "web") {
      // Lưu vào localStorage nếu là web
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(`Error setting secure item with key ${key}:`, error);
  }
};

// Hàm lấy item từ SecureStore
export const getSecureItem = async (
  key: SecureStoreKey
): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      // Lấy từ localStorage nếu là web
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error(`Error getting secure item with key ${key}:`, error);
    return null;
  }
};

// Hàm xóa item khỏi SecureStore
export const deleteSecureItem = async (key: SecureStoreKey) => {
  try {
    if (Platform.OS === "web") {
      // Xóa từ localStorage nếu là web
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Error deleting secure item with key ${key}:`, error);
  }
};
