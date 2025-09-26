import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";
import { DBConnect } from "@/lib/dbconnect";
import { User } from "@/models/user.model";
import { Session } from "next-auth";

// this is from spotify dev console
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
].join(" ");

//accesstoken refreshment accesstokne is valid for 1 hour and refresh token is valid for 6 months
async function refreshAccessToken(token: any) {
  try {
    //calling the api with refresh token

    const url = "https://accounts.spotify.com/api/token";

    // const params = new URLSearchParams({
    //   grant_type: "refresh_token",
    //   refresh_token: refreshToken,
    //   client_id: process.env.SPOTIFY_CLIENT_ID!,
    //   client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    // });

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

    const { data } = response;

    return {
      ...token,
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      refreshToken: data.refreshToken || token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  /* while implementing nextAuthoptions here are the important fields to mention in this file 
    1. providers :
        it contains clientid and clientsecret also thee authorization configs like scope for the user requests (refer to the specific provider console)
    2. callbacks : 
        this are the functions which helps to perform actions while handling jwt and sessions 
    3. session :
        to define the authentication strategy 
    4. secret: 
        nextauth secret to encode and decode the token 
    */

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

  //this is the function which is called when the user is authenticated and the session is created
  //callback are for the customized behaviour for the authentication

  callbacks: {
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
            console.error("Spotify did not return an email.");
            return false; // block sign-in if no email
          }

          let user = await User.findOne({ spotifyId: spotifyProfile.id });

          if (!user) {
            // Create new user
            user = new User({
              username: spotifyProfile.display_name || "Unknown User",
              email: spotifyProfile.email,
              spotifyId: spotifyProfile.id,
            });
            await user.save();
            console.log("✅ New user created:", user._id);
          } else {
            // Update safe fields if needed (not tokens, handled by JWT)
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
          return false; // block sign-in on error
        }
      }

      return true; // allow sign in
    },

    //jwt is called when the token is getting created or at the time of login
    // async jwt({ account, token }) {
    //   const now = Date.now();
    //   //if the token is expired then refresh the token
    //   if (token.expiresAt && token.expiresAt < now) {
    //     console.log("Token expired, refreshing access token...");
    //     return await refreshAccessToken(token);
    //   }
    //   if (account) {
    //     //extractin from the account object
    //     const { access_token, expires_at, refresh_token } = account;
    //     //putting the values in the token object
    //     token.accessToken = access_token;
    //     token.refreshToken = refresh_token;
    //     token.expiresAt = expires_at;
    //   }
    //   return token;
    // },

    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000, // convert sec → ms
          user, // minimal safe user info (from DB or provider)
        };
      }

      // Return previous token if still valid
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Access token expired → refresh
      return await refreshAccessToken(token);
    },

    //this is the function which is called when the user is authenticated and the session is created

    //THE GREATEST ADDTION IS NEVER SENT SENSITIVE DATA LIKE ACCESSTOKEN AND REFRESHTOKEN TO THE SESSION OBJECT, BECAUSET THE JWT IS HTTP-ONLY AND IT STORES THE CREDENTIALS VERY SECURELY IN CLIENT SIDE WHERE THE CLIENT CANNOT READ DIRECTLY THE CREDENTIALS, INSTEAD CLIENT CAN ACCESS ONLY THE SESSION WHICH MUST BE CONTAINING NON SENSITIVE DATA
    // async session({ session, token }) {
    //   // console.log("Session Callback - Token:", token);
    //   // console.log("Session Callback - Session:", session);
    //   //putting the values in the session object
    //   session.accessToken = token.accessToken;
    //   session.refreshToken = token.refreshToken;
    //   session.expiresAt = token.expiresAt;

    //   if (token.error) {
    //     session.error = token.error.toString(); // Convert error to string if it's an object
    //   }

    //   return session;
    // },

    async session({ session, token }) {
      // Never expose refreshToken
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

/* decoded token which has expired access token , was still present in the browser thats why i tested , TOKEN NAME =  next-auth.session-token
{
    name: 'Kratikesh18',
    email: 'pk18home@gmail.com',
    picture: 'https://i.scdn.co/image/ab6775700000ee85243e4ab89978781c22f245d3',
    sub: '9qdnav0itpvua1jbh6kbcwwnb',
    accessToken: 'BQBklzuY-wp0__chtHI5KwAYVVwZlY_6Opbexvzoew56zGlnVNPW62AwdNyqy7iDbWN0_aj-07WxlY1HQuG7guf5xmPVvpReW4xnghDnqmCEOmOeqVq-WmCr4pRdFR3TuZfmatgm9gmno35Xq6lRmymFbz6Ff3zT4ZhnRrjdD1ChPKZTjGTm-JnH3QliMKt8YkJtQL3FfyXWrzfFnCyTo-LH-fzxoDpoUht1wRQJ4Gj2kPkPHdhXwTZsOhs',
    refreshToken: 'AQCtgcuYa7EsPyrjIpN8lC4k_bBzjhdDmzG3tVZajuEc2s7drHE_wdOPEmu-we6ERSlBesIM-4viNXhFxXCCRy6tNh2UbF6T0HdbEv0PY5FxURtWp2THAwmSnfgixLdFUZU',
    expiresAt: 3487548816636,
    iat: 1743850755,
    exp: 1746442755,
    jti: '582dfcc5-9615-4967-a7bc-01e6f5cae91e'
  }
*/
