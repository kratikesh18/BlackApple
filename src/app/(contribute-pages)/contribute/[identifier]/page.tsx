"use client";
import { ISongData } from "@/app/api/(lyrics-routes)/getDetailsById/route";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { newLyricsSchema } from "@/schemas/newLyricsSchema";
import { changeAvailability } from "@/store/slices/currentTrackSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

// function lyricsToString(data: ISongData | null) {
//   if (!data) return;

//   let stringedLyrics = data.lyrics.map((each) => each.line).join("\n");
//   console.log(stringedLyrics);

//   return stringedLyrics;
// }

const ContributePage = () => {
  //take the parameter from url
  const params = useParams();

  const [songData, setSongData] = useState<ISongData | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    //fetching the songdata
    const fetchSongDetails = async () => {
      try {
        const { data } = await api.get(
          `/getDetailsById?gid=${params.identifier}`,
        );
        setSongData(data.data);
      } catch (error: any) {
        console.error("Failed to fetch song details:", error.message);
      }
    };
    fetchSongDetails();
  }, [params.identifier]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const saveLyrics = async (data: z.infer<typeof newLyricsSchema>) => {
    try {
      setLoading(true);
      console.log("Form data to submit:", data);
      // if (!currentTrack || !data) {
      //   console.log("provide full data");
      //   return;
      // }

      console.log(data.rawText);
      const response = await api.post("/lyrics/contribute", {
        rawString: data.rawText,
        global_id: params.identifier,
      });

      console.log("Lyrics submission response:", response);

      toast.success("Lyrics submitted successfully!");
      dispatch(changeAvailability());

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.warn("Error submitting lyrics:", error.message);
      } else {
        console.warn("Error submitting lyrics:", error);
      }
      toast.error("Failed to submit lyrics.");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof newLyricsSchema>>({
    resolver: zodResolver(newLyricsSchema),
  });

  useEffect(() => {
    if (!songData || !songData.lyrics.lyricsText) return;
    // console.log(typeof songData.lyrics.lyricsText);
    // console.log(songData.lyrics.lyricsText.length);

    const text = songData.lyrics.lyricsText.map((l) => l.line).join("\n");

    form.reset({ rawText: text });
  }, [songData]);

  if (!songData) {
    return <div>Hold on, we are working on it.</div>;
  }

  return (
    <div className="md:container mx-auto h-full w-full bg-gradient-to-b  p-3 md:p-6">
      <div className="flex flex-col gap-4 h-full ">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            You are Contributing Lyrics For
          </h1>
        </div>

        {/* Song Info */}
        <div className="flex items-center justify-between gap-3 ">
          {/* Text Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 flex-1 min-w-0 h-full flex  flex-col justify-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-400">
              {songData.name}
            </h2>

            <div className="flex flex-wrap gap-1 text-sm sm:text-base">
              {songData.artists.map((artist, idx) => (
                <span className="text-white" key={idx}>
                  {artist}
                  {idx !== songData.artists.length - 1 && ","}
                </span>
              ))}
            </div>

            <p className="text-zinc-400 text-sm sm:text-base">
              {songData.album.name}
            </p>
          </div>

          {/* Artwork */}
          <div className="flex-shrink-0">
            <Image
              src={songData.album.image}
              alt={songData.name}
              height={150}
              width={150}
              className="rounded-xl w-16 h-16 sm:w-24 sm:h-24 md:w-[140px] md:h-[140px] object-cover"
            />
          </div>
        </div>

        {/* Lyrics Editor */}
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <div className="flex justify-between items-center">
            <label className="text-lg sm:text-xl md:text-2xl text-white font-medium">
              Lyrics
            </label>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(saveLyrics)}
              className="flex flex-col gap-3 flex-1"
            >
              <FormField
                control={form.control}
                name="rawText"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col min-h-0">
                    <FormControl>
                      <Textarea
                        id="lyrics"
                        placeholder="Start typing lyrics here..."
                        className="bg-white/5 flex-1 min-h-0 text-lg sm:text-xl md:text-2xl border-white/10 text-white placeholder:text-zinc-500 overflow-y-auto"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-green-700 w-fit px-4"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit and sync"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;
