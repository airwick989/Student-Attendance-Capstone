import { FirestoreAdapter } from "@auth/firebase-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { cert } from "firebase-admin/app"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && (user.email.endsWith('@ontariotechu.net') || user.email.endsWith('@ontariotechu.ca'))) {
        return true;
      } else {
        return false;
      }
    }
  },

  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    })
  }),
  session: {
    strategy: "jwt",
  },

}

export default NextAuth(authOptions)