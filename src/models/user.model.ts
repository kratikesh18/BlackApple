import mongoose, { Document, Model } from "mongoose";

interface UserType extends Document {
  username: string;
  email: string;
  spotifyId: string;
  // accessToken: string;
  // refreshToken: string;
  // tokenExpiresAt: number;
  contributedLyrics: string[]; // Array of lyric IDs or references
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserType>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    // displayName: { type: String, required: true },
    spotifyId: {
      type: String,
      required: true,
      unique: true,
    },
    // accessToken: {
    //   type: String,
    //   required: true,
    // },
    // refreshToken: { type: String, required: true },
    // tokenExpiresAt: {
    //   type: Number,
    //   required: true,
    // },
    country: { type: String },

    contributedLyrics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lyrics",
      },
    ],
  },
  { timestamps: true }
);

export const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);
