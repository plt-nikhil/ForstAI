import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import moment from "moment";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = credentials;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const userData = await res.json();

        if (res.ok && userData) {
          const { success, data } = userData;
          if (success) {
            const user = data.user;
            const { refresh, access } = data.tokens;
            return {
              ...user,
              id: user.id,
              name: user.firstName,
              access: access.token,
              refresh: refresh.token,
              accessTokenExpiry: access.expires,
            };
          }
        } else {
          const { message } = userData;
          throw new Error(message);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.access = token.access;
        session.user.refresh = token.refresh;
        session.user.accessTokenExpiry = token.accessTokenExpiry;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update" && session?.image) {
        token.picture = session.image
      }
      if (trigger === "update" && session?.name && session?.email) {
        token.name = session.name
        token.email = session.email
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.access = user.access;
        token.refresh = user.refresh;
        if (user.accessTokenExpiry) {
          let timestamp = new Date(user.accessTokenExpiry);
          token.accessTokenExpiry = timestamp.getTime();
        }
      }
      const tokenExpiryTime = moment(token.accessTokenExpiry);
      if (
        tokenExpiryTime.isBefore(new Date()) ||
        tokenExpiryTime.diff(new Date()) < 8
      ) {
        token = await refreshAccessToken(token);
        return token;
      }
      return token;
    },
  },
  pages: { signIn: "auth/signin" },
};
async function refreshAccessToken(tokenObject: JWT) {
  try {
    // Get a new set of tokens with a refreshToken
    const body = {
      refreshToken: tokenObject.refresh,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    const tokenResponse = await res.json();
    if (tokenResponse) {
      const { success, data } = tokenResponse;
      if (success) {
        const { refresh, access } = data;
        let expiry = access.expires;
        expiry = new Date(expiry).getTime();
        const newToken = {
          ...tokenObject,
          access: access.token,
          refresh: refresh.token,
          accessTokenExpiry: expiry,
        };
        return newToken;
      }
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}
