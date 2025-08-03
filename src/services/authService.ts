import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth } from "../firebase/config";

export class AuthService {
  /**
   * メール・パスワードでログイン
   */
  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }

  /**
   * ログアウト
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  /**
   * 現在のユーザーを取得
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }
}
