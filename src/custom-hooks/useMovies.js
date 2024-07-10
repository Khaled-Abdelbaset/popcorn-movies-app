import { useEffect, useState } from "react";

const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetcMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${IMDB_API_KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Error in fetching movies");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie Not Found ⛔");
          }

          setMovies(data.Search);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError([]);
        return;
      }
      fetcMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return {movies, isLoading, error}
}