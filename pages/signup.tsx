import type { FormEvent } from "react";

import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import { mail_signup } from "../src/framework/firebase/auth"; // 上記で実装したファイル

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault(); 
    console.log("test")// デフォルトの<form />の挙動を無効にする
    await mail_signup(email, password);
    console.log("test2") // email・passwordを使ってログイン
    router.push("/"); // ダッシュボードページへ遷移させる
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mail_signup(email, password);
    router.push("/");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div>
      <h1>新規登録</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
