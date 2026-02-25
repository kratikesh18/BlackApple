"use client";
import { ISongData } from "@/app/api/(lyrics-routes)/getDetailsById/route";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { newLyricsSchema } from "@/schemas/newLyricsSchema";
import { changeAvailability } from "@/store/currentTrackSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const ContributePage = () => {
  const params = useParams();
  const [songData, setSongData] = useState<ISongData | null>(null);

  const form = useForm<z.infer<typeof newLyricsSchema>>({
    resolver: zodResolver(newLyricsSchema),
    defaultValues: { rawText: "" },
  });

  const dispatch = useDispatch();

  useEffect(() => {
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


      console.log(data.rawText)
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

  if (!songData) {
    return <div>Hold on, we are working on it.</div>;
  }

  return (
    <div className="container h-full w-full bg-gradient-to-b from-black to-zinc-900 p-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl h-full flex flex-col">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            You are Contributing Lyrics For
          </h1>
        </div>

        <div className=" flex justify-between">
          <div className="bg-white/5 border flex-1 border-white/10 rounded-xl p-4 space-y-1">
            <h2 className="text-2xl font-semibold text-green-400 mt-2">
              {songData.name}
            </h2>
            <div className="flex flex-wrap gap-1">
              {songData.artists.map((artist, idx) => (
                <span className="text-white" key={idx}>
                  {artist},
                </span>
              ))}
            </div>
            <p className="text-zinc-400 ">Album: {songData.album.name}</p>
          </div>
          <div>
            <img
              src={songData.album.image}
              alt={songData.name}
              height={140}
              width={140}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2 mt-2 flex-1 min-h-0 flex flex-col">
          <div className="flex w-full justify-between items-center">
            <label className="text-2xl text-white font-medium" htmlFor="lyrics">
              Lyrics
            </label>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(saveLyrics)}
              className="flex flex-col gap-4 flex-1"
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
                        className="bg-white/5 flex-1 min-h-0 !text-3xl  border-white/10 text-white placeholder:text-zinc-500 overflow-y-scroll "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-green-700 w-fit px-4 "
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
