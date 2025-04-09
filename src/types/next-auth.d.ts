import {DefaultSession} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId?: string | undefined | null;
      tel?: string | undefined | null;
      name?: string | undefined | null;
      email?: string | undefined | null;
      image?: string | undefined | null;
      birthday?: string | undefined | null;
      socialLogin?: string | undefined | null;
      token?: string | undefined | null;
    } & DefaultSession["user"]; // 기존 사용자 속성 유지 id,name,email,image
  }

  interface User {
    userId?: string;
    tel?: string;
    name?: string;
    email?: string;
    image?: string;
    birthday?: string;
    socialLogin?: string;
    token?: string;
    data?: {
      userId?: string;
      tel?: string;
      name?: string;
      email?: string;
      image?: string;
      birthday?: string;
      socialLogin?: string;
      token?: string;
    }
  }
}