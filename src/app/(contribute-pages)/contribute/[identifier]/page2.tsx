"use client";
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
import { useLyricsService } from "@/hooks/useLyricsService";
import api from "@/lib/api";
import { newLyricsSchema } from "@/schemas/newLyricsSchema";
import { changeAvailability } from "@/store/currentTrackSlice";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const ContributePage = () => {
  const { currentTrack } = useSelector(
    (state: RootState) => state.currentTrack,
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const saveLyrics = async (data: z.infer<typeof newLyricsSchema>) => {
    try {
      setLoading(true);
      console.log("Form data to submit:", data);
      // if (!currentTrack || !data) {
      //   console.log("provide full data");
      //   return;
      // }
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

  const { getLyricsForCurrentTrack } = useLyricsService();
  const [existingLyrics, setExistingLyrics] = useState();

  useEffect(() => {
    const getLyricsIfLyricsPresent = async () => {
      // console.log("Hellooo", currentTrack)
      if (currentTrack?.isLyricsAvailable) {
        //then try to fetch the lyrics
        const response = await getLyricsForCurrentTrack(currentTrack.gid);

        // console.log("printing the response from the hook ", response);

        if (!(response === null)) {
          console.warn("Response is not Null");
          let rawsting = "";
          response.lyricsText.map(
            (line, index) => (rawsting += line.line.concat("\\n")),
          );

          console.log("printing rawstring", rawsting);
        }
      }
      // console.log("Hello ")
    };
    getLyricsIfLyricsPresent();
  }, [currentTrack]);

  const form = useForm<z.infer<typeof newLyricsSchema>>({
    resolver: zodResolver(newLyricsSchema),
    defaultValues: { rawText: "" },
  });

  
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">You are editing </h1>
      </div>
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
          <Button type="submit" className="bg-green-700" disabled={loading}>
            {loading ? "Submitting..." : "Submit and sync"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContributePage;
