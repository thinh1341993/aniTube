// Định nghĩa kiểu dữ liệu cho thông tin trả về từ Firebase Authentication
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  token?: string | null;
}

// Định nghĩa kiểu dữ liệu cho thông tin người dùng trong Firestore
export interface UserInfo extends FirebaseUser {
  friends?: string[]; // Danh sách bạn bè (chỉ lưu UID)
  createdAt?: Date; // Thời gian tạo tài khoản
}
