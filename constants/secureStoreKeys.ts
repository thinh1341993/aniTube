// Định nghĩa các key cho SecureStore
export const SECURE_STORE_KEYS = {
  USER_EMAIL: "userEmail",
  USER_PASSWORD: "userPassword",
  USER_TOKEN: "userToken",
} as const;

// Tạo type từ object SECURE_STORE_KEYS
export type SecureStoreKey =
  (typeof SECURE_STORE_KEYS)[keyof typeof SECURE_STORE_KEYS];
