import firebaseApp from "./firebase";
import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "../common/User";

const provider = new GoogleAuthProvider();

export function google_login(): void {
  const auth = getAuth(firebaseApp);
  signInWithRedirect(auth, provider);
}

export const mail_login = async (email: string, password: string) => {
  // FirebaseAuthを取得する
  const auth = getAuth(firebaseApp);
  // メールアドレスとパスワードでログインする
  const result = await signInWithEmailAndPassword(auth, email, password);
  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken();
  // Cookieにセッションを付与するようにAPIを投げる
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
};

export const mail_signup = async (email: string, password: string) => {
  // FirebaseAuthを取得する
  const auth = getAuth(firebaseApp);
  // メールアドレスとパスワードでログインする
  const result = await createUserWithEmailAndPassword(auth, email, password);
  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken();
  // Cookieにセッションを付与するようにAPIを投げる
  await fetch("/api/session", { method: "POST", body: JSON.stringify({ id }) });
};

export function logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  const auth = getAuth(firebaseApp);

  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo: User | null = user
      ? {
          displayName: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        }
      : null;
    callback(userInfo);
  });
};
