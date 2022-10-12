import type { GetServerSideProps, NextPage } from "next";
import { LoginButton, LogoutButton } from "../src/components/Button";
import nookies from "nookies";
import { useRouter } from "next/router";

import { logout } from "../src/framework/firebase/auth"; // 上記で実装したファイル
import { firebaseAdmin } from "../firebaseAdmin";
import { useAuthContext } from "../src/framework/context/AuthContext"; // この後に実装するファイル

const DashboardPage: NextPage<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const onLogout = async () => {
    await logout(); // ログアウトさせる
    router.push("/login"); // ログインページへ遷移させる
  };

  return (
    <div>
      <h1>Dashboard Pages</h1>
      <div>{currentUser ? <h2>email: {currentUser.uid}</h2> : <LoginButton />}</div>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
/*
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx);
    const session = cookies.session || "";
  
    // セッションIDを検証して、認証情報を取得する
    const user = await firebaseAdmin
      .auth()
      .verifySessionCookie(session, true)
      .catch(() => null);
  
    //認証情報が無い場合は、ログイン画面へ遷移させる
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  
    return {
      props: {
        email: user.email,
      },
    };
  };
  
*/
export default DashboardPage;
