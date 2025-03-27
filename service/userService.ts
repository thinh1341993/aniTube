import { UserInfo } from "@/types/userTypes";
import { db } from "@/utils/firebaseConfig";
import { User } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";

// Tìm kiếm người dùng theo tên hoặc email
export const searchUsers = async (queryText: string): Promise<UserInfo[]> => {
  try {
    const usersRef = collection(db, "users");
    // Tạo hai điều kiện tìm kiếm: theo displayName và email
    const q = query(
      usersRef,
      where("displayName", ">=", queryText),
      where("displayName", "<=", queryText + "\uf8ff"),
      orderBy("displayName")
    );

    const emailQ = query(
      usersRef,
      where("email", ">=", queryText),
      where("email", "<=", queryText + "\uf8ff"),
      orderBy("email")
    );

    // Lấy kết quả từ cả hai truy vấn
    const [displayNameResults, emailResults] = await Promise.all([
      getDocs(q),
      getDocs(emailQ),
    ]);

    const users: UserInfo[] = [];
    const uniqueUsers = new Set<string>(); // Đảm bảo không trùng lặp

    // Thêm kết quả từ displayName
    displayNameResults.forEach((doc) => {
      const user = doc.data() as User;
      if (!uniqueUsers.has(user.uid)) {
        users.push(user);
        uniqueUsers.add(user.uid);
      }
    });

    // Thêm kết quả từ email
    emailResults.forEach((doc) => {
      const user = doc.data() as User;
      if (!uniqueUsers.has(user.uid)) {
        users.push(user);
        uniqueUsers.add(user.uid);
      }
    });

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

// Thêm bạn bè vào Firestore
export const addFriend = async (
  uid: string,
  friendUid: string
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    const friendRef = doc(db, "users", friendUid);

    // Thêm friendUid vào danh sách bạn bè của user
    await setDoc(userRef, { friends: [friendUid] }, { merge: true });

    // Thêm uid vào danh sách bạn bè của friend
    await setDoc(friendRef, { friends: [uid] }, { merge: true });
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};
