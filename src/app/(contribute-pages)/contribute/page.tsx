"use client";
import { newLyricsSchema } from "@/schemas/newLyricsSchema";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

function ContributePage() {
  const form = useForm<z.infer<typeof newLyricsSchema>>({
    resolver: zodResolver(newLyricsSchema),
    defaultValues: { rawText: "" },
  });

  const saveLyrics = async (data: z.infer<typeof newLyricsSchema>) => {
    console.log(data);
  };

  return (

    <div className=" ">
      <div><h1>You are editing </h1></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveLyrics)}>
          <FormField
            control={form.control}
            name="rawText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Start writing lyrics"
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
    </div>
  );
}

export default ContributePage;
