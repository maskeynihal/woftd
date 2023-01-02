import { useEffect, useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./app.css";

import { createClient } from "@supabase/supabase-js";
import supabaseConstants from "./constants/supabase";
import { useQuery } from "react-query";
import dayjs from "dayjs";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseConstants.projectUrl,
  supabaseConstants.apiKey
);

export function App() {
  const searchParams = new URLSearchParams(document.location.search);

  const date = searchParams.get("date");

  const { data: { data: [wordOfTheDay] = [] } = {}, isLoading } = useQuery(
    "words",
    async () =>
      await supabase
        .from(supabaseConstants.tables.words)
        .select("*")
        .eq("word_for", dayjs(new Date(date)).format("YYYY-MM-DD"))
        .limit(1)
  );

  return (
    <>
      <h1>Word of the day</h1>

      {isLoading ? (
        <h3>Loading ...</h3>
      ) : wordOfTheDay ? (
        <div>
          <h2>{wordOfTheDay.word}</h2>
          <p>{wordOfTheDay.description}</p>
        </div>
      ) : (
        <h3>No Word of the day, Yet!!</h3>
      )}
    </>
  );
}
