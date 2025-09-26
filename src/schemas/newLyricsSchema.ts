import { z } from "zod";
const newLyricsSchema = z.object({
  rawText: z.string(),
});
export { newLyricsSchema };
