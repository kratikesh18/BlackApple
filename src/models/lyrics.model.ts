import mongoose, { Schema, Types, Document } from "mongoose";

// Define the LyricsLine interface
export interface LyricsLine {
  line: string;
  startTime: number;
  endTime: number;
}

// Define the Lyrics interface
export interface Lyrics extends Document {
  global_id: string;
  lyricsText: LyricsLine[];
  contributedBy: Types.ObjectId[];
  readyToPulish: boolean;
  keywords: string[];
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
    default: 0,
  },
  endTime: {
    type: Number,
    required: true,
    default: 5,
  },
});

// Create the Lyrics schema
const LyricsSchema: Schema<Lyrics> = new Schema(
  {
    global_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lyricsText: {
      type: [LyricsLineSchema],
      required: true,
      default: [],
    },
    contributedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: false,
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

//before saving the lyrics, we can auto-generate timestamps for each line if not provided
LyricsSchema.pre("save", function (next) {
  const lyrics = this as Lyrics;
  if (lyrics.lyricsText && lyrics.lyricsText.length > 0) {
    let startTime = 0;
    let endTime = 5;
    lyrics.lyricsText.forEach((line, index) => {
      line.startTime = startTime;
      line.endTime = endTime;
      startTime = endTime + 1;
      endTime = startTime + 4;
    });
  }
  next();
});

// Export the Lyrics model
const LyricsModel =
  mongoose.models.Lyrics || mongoose.model<Lyrics>("Lyrics", LyricsSchema);

export default LyricsModel;
