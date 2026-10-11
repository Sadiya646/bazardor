import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
 
  baseURL: "https://bazardor-blush.vercel.app",
});


export const { signIn, signUp, useSession,updateUser } = authClient;