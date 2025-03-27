// stores/authStore.ts
import { SECURE_STORE_KEYS } from "@/constants/secureStoreKeys";
import { tx } from "@/i18n/i18n";
import { addUserToFirestore, listenToAuthState } from "@/service/authService";
import { FirebaseUser, UserInfo } from "@/types/userTypes";
import { auth } from "@/utils/firebaseConfig";
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
} from "@/utils/secureStoreHelper";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { makeAutoObservable } from "mobx";

export class AuthStore {
  // Trạng thái user
  user: UserInfo | null = null; // Lưu thông tin người dùng (null nếu chưa đăng nhập)

  constructor() {
    makeAutoObservable(this); // Tự động quan sát tất cả các thuộc tính và phương thức
    this.initAuthListener();
  }

  // Hàm lưu thông tin người dùng
  async setUser(userData: FirebaseUser, password?: string) {
    this.user = userData;

    // Lưu email, password và token vào SecureStore
    if (password) {
      console.log("Lưu email, password và token vào SecureStore");
      await setSecureItem(SECURE_STORE_KEYS.USER_EMAIL, userData.email || "");
      await setSecureItem(SECURE_STORE_KEYS.USER_PASSWORD, password || "");
      await setSecureItem(SECURE_STORE_KEYS.USER_TOKEN, userData.token || "");
    }
  }

  // Hàm xóa thông tin người dùng (khi đăng xuất)
  async clearUser() {
    this.user = null;

    // Xóa email, password và token khỏi SecureStore
    await deleteSecureItem(SECURE_STORE_KEYS.USER_EMAIL);
    await deleteSecureItem(SECURE_STORE_KEYS.USER_PASSWORD);
    await deleteSecureItem(SECURE_STORE_KEYS.USER_TOKEN);
  }

  // Hàm load thông tin người dùng từ SecureStore
  async loadUser(): Promise<string | null> {
    const email = await getSecureItem(SECURE_STORE_KEYS.USER_EMAIL);
    const password = await getSecureItem(SECURE_STORE_KEYS.USER_PASSWORD);
    // const token = await getSecureItem(SECURE_STORE_KEYS.USER_TOKEN);

    if (email && password) {
      const error = await this.login(email, password);
      return error;
    } else {
      return tx("errors.loginFailed");
    }
  }

  // Khởi tạo listener cho trạng thái đăng nhập
  initAuthListener() {
    listenToAuthState((user) => {
      this.user = user; // Cập nhật trạng thái người dùng
    });
  }

  // Hàm kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!this.user;
  }

  // Hàm đăng nhập
  async login(email: string, password: string): Promise<string | null> {
    try {
      // Gọi API Firebase để đăng nhập
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Lấy token từ Firebase
      const token = await userCredential.user.getIdToken();
      // Lưu thông tin người dùng vào store
      this.setUser(
        {
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          token: token || "",
        },
        password
      );
      return null; // Đăng nhập thành công
    } catch (err: any) {
      // Xử lý lỗi từ Firebase
      let errorMessage = ""; // Default error message
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = tx("errors.userNotFound");
          break;
        case "auth/wrong-password":
          errorMessage = tx("errors.wrongPassword");
          break;
        case "auth/network-request-failed":
          errorMessage = tx("errors.networkError");
          break;
        default:
          errorMessage = tx("errors.loginFailed");
      }
      return errorMessage; // Trả về lỗi để hiển thị
    }
  }

  // Hàm đăng ký
  async register(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Lấy token từ Firebase
      const token = await userCredential.user.getIdToken();
      // Lưu thông tin người dùng và token vào store
      const user = userCredential.user;
      this.setUser(
        {
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          token: token || "",
        },
        password
      );
      // Lưu thông tin người dùng vào Firestore
      addUserToFirestore({ uid: user.uid, email });

      return null; // Đăng nhập thành công
    } catch (err: any) {
      // Xử lý lỗi từ Firebase
      let errorMessage = tx("errors.registrationFailed"); // Default error message
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = tx("errors.emailAlreadyInUse");
          break;
        case "auth/weak-password":
          errorMessage = tx("errors.weakPassword");
          break;
        case "auth/network-request-failed":
          errorMessage = tx("errors.networkError");
          break;
        default:
          errorMessage = tx("errors.registrationFailed");
      }
      return errorMessage; // Trả về lỗi để hiển thị
    }
  }

  // Hàm đăng xuất
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      // Xóa thông tin người dùng và token
      await this.clearUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}

export const authStore = new AuthStore();
