// stores/authStore.ts
import { makeAutoObservable } from "mobx";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export class AuthStore {
  user: User | null = null;
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
    this.initAuthListener();
  }

  initAuthListener() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  }

  async login(email: string, password: string) {
    this.loading = true;
    this.error = "";
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    signOut(auth);
    this.user = null;
  }
}

// export const authStore = new AuthStore();
