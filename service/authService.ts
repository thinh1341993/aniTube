import { FirebaseUser, UserInfo } from "@/types/userTypes";
import { auth, db } from "@/utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Lấy thông tin người dùng từ Firestore
export const getUserFromFirestore = async (
  uid: string
): Promise<UserInfo | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserInfo; // Chuyển đổi dữ liệu thành kiểu User
    }
    return null;
  } catch (error) {
    console.error("Error fetching user from Firestore:", error);
    return null;
  }
};

// Thêm hoặc cập nhật thông tin người dùng vào Firestore
export const addUserToFirestore = async ({
  uid,
  email,
  displayName,
  photoURL,
}: FirebaseUser) => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        uid,
        email,
        displayName: displayName || "",
        photoURL: photoURL || "",
        friends: [], // Danh sách bạn bè (ban đầu rỗng)
        createdAt: new Date(), // Thời gian tạo tài khoản
      },
      { merge: true }
    ); // Sử dụng merge để không ghi đè dữ liệu cũ
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

// Lắng nghe trạng thái đăng nhập của người dùng
export const listenToAuthState = (onUserLoggedIn: (user: UserInfo) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Lấy token từ Firebase
      const token = await user.getIdToken();
      // Người dùng đã đăng nhập
      const userInfo: UserInfo = {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        token: token || "",
      };
      // Kiểm tra xem người dùng đã tồn tại trong Firestore chưa
      const existingUser = await getUserFromFirestore(userInfo.uid);
      console.log("existingUser", existingUser);
      if (!existingUser) {
        // Nếu chưa tồn tại, thêm người dùng vào Firestore
        await addUserToFirestore(userInfo);
      }

      // Gọi callback để xử lý logic sau khi người dùng đăng nhập
      onUserLoggedIn(existingUser || userInfo);
    } else {
      // Người dùng đã đăng xuất
      console.log("User logged out");
    }
  });
};
