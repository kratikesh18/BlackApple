import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";
import { DBConnect } from "@/lib/dbconnect";
import { User } from "@/models/user.model";
import { Session } from "next-auth";

// Spotify scopes
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
].join(" ");

/**
 * Refresh Spotify Access Token
 */
async function refreshAccessToken(token: any) {
  try {
    const url = "https://accounts.spotify.com/api/token";

    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data;

    // Debug log
    console.log("🎧 Spotify token refreshed successfully:", {
      newAccessToken: data.access_token ? "✅ Received" : "❌ Missing",
      expires_in: data.expires_in,
    });

    return {
      ...token,
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000, // expires_in is in seconds
      refreshToken: data.refresh_token ?? token.refreshToken, // keep old if new not provided
    };
  } catch (error: any) {
    console.error(
      "❌ Error refreshing Spotify access token:",
      error.response?.data || error.message
    );

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

/**
 * NextAuth Configuration
 */
export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * SignIn Callback - Create or update user in DB
     */
    async signIn({ account, profile }) {
      if (account?.provider === "spotify" && profile) {
        try {
          await DBConnect();

          const spotifyProfile = profile as {
            id: string;
            display_name?: string;
            email?: string;
          };

          if (!spotifyProfile.email) {
            console.error("⚠️ Spotify did not return an email.");
            return false;
          }

          let user = await User.findOne({ spotifyId: spotifyProfile.id });

          if (!user) {
            user = new User({
              username: spotifyProfile.display_name || "Unknown User",
              email: spotifyProfile.email,
              spotifyId: spotifyProfile.id,
            });
            await user.save();
            console.log("✅ New user created:", user._id);
          } else {
            if (user.email !== spotifyProfile.email) {
              user.email = spotifyProfile.email;
            }
            if (user.username !== spotifyProfile.display_name) {
              user.username = spotifyProfile.display_name || user.username;
            }
            await user.save();
            console.log("🔄 Existing user updated:", user._id);
          }
        } catch (error) {
          console.error("❌ Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },

    /**
     * JWT Callback - Handles token lifecycle
     */
    async jwt({ token, account, user }) {
      // On initial login
      if (account) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000, // fallback 1h
          user,
        };
      }

      // If token still valid
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Otherwise refresh
      console.log("🔁 Access token expired, refreshing...");
      return await refreshAccessToken(token);
    },

    /**
     * Session Callback - Controls what is exposed to client
     */
    async session({ session, token }) {
      session.user = token.user as Session["user"];
      session.accessToken = token.accessToken as string;
      session.expiresAt = token.expiresAt as number;

      if (token.error) {
        session.error = String(token.error);
      }

      return session;
    },
  },
};
