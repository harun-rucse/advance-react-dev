import { useState, useEffect } from "react";

const API_KEY = "f297a5f8";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    async function fetchMovies() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok)
          throw new Error("Something went wrong with featching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err) {
        if (!err.name === "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { loading, error, movies };
}
