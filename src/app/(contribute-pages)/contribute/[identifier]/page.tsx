"use client";
import { ContributeLyricsForm } from "@/components/app-components/lyrics-components/ContributeLyricsForm";
import SpotifyCurrentState from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSpotifyService } from "@/hooks/useSpotifyService";
import api from "@/lib/api";
import { newLyricsSchema } from "@/schemas/newLyricsSchema";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChartNoAxesColumnIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const ContributePage = () => {
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack
  );

  // const { submitLyrics } = useSpotifyService();

  // const submitLyrics = async (data: { rawText: string }) => {
  // const response = await api.post("/lyrics/contribute", {
  //   rawText: data.rawText,
  //   track: currentTrack,
  //   global_id: currentTrack?.global_id,
  // });
  // console.log("API response:", response);
  // };

  const form = useForm<z.infer<typeof newLyricsSchema>>({
    resolver: zodResolver(newLyricsSchema),
    defaultValues: { rawText: "" },
  });

  const saveLyrics = async (data: z.infer<typeof newLyricsSchema>) => {
    console.log("Form data to submit:", data);
    if (!currentTrack || !data) {
      console.log("provide full data");
      return;
    }
    const response = await api.post("/lyrics/contribute", {
      rawString: data.rawText,
      global_id: currentTrack?.global_id,
    });

    console.log("Lyrics submission response:", response);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(saveLyrics)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="rawText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Start writing lyrics..."
                    className="text-4xl h-[10rem]"
                    rows={20}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-700">
            Submit and sync
          </Button>
        </form>
      </Form>

      <SpotifyCurrentState track={currentTrack} />
    </div>
  );
};

export default ContributePage;
