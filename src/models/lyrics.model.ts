import mongoose, { Schema, Types, Document } from "mongoose";

// Define the LyricsLine interface
export interface LyricsLine{
  line: string;
  startTime: number; // Start time in seconds
  endTime: number; // End time in seconds
}

// Define the Lyrics interface
export interface Lyrics extends Document {
  spotifyId: string;
  contributedBy: Types.ObjectId[];
  readyToPulish: boolean;
  keywords: string[];
  lyricsText?: LyricsLine[];
}

// Create the LyricsLine schema
const LyricsLineSchema: Schema<LyricsLine> = new Schema({
  line: {
    type: String,
    required: true,
    trim: true,
  },
  startTime: {
    type: Number,
    required: true,
    default: 0, // Default to 0, will be updated in pre-save hook
  },
  endTime: {
    type: Number,
    required: true,
    default: 5, // Default to 5, will be updated in pre-save hook
  },
});

// Create the Lyrics schema
const LyricsSchema: Schema<Lyrics> = new Schema(
  {
   
    spotifyId:{
        type:String,
        required:true,
    },
    contributedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    
   
    lyricsText: {
      type: [LyricsLineSchema],
      required: false,
      default: [],
    },
    keywords: {
      type: [String],
      required: false,
    },
    readyToPulish: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Pre-save hook to set startTime and endTime
LyricsSchema.pre("save", function (next) {
  const lyrics = this as Lyrics;
  if (lyrics.lyricsText && lyrics.lyricsText.length > 0) {
    let startTime = 0;
    let endTime = 5;
    lyrics.lyricsText.forEach((line, index) => {
      line.startTime = startTime;
      line.endTime = endTime;
      startTime = endTime + 1; // Increment the start time for the next line
      endTime = startTime + 4; // Increment the end time for the next line
    });
  }
  next();
});

// Export the Lyrics model
const LyricsModel =
  mongoose.models.Lyrics || mongoose.model<Lyrics>("Lyrics", LyricsSchema);

export default LyricsModel;
