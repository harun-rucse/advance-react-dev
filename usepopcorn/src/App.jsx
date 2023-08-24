import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Logo from "./components/logo";
import Search from "./components/search";
import NumResult from "./components/num-result";
import Box from "./components/box";
import MovieList from "./components/movie-list";
import WatchedSummary from "./components/watched-summary";
import WatchedList from "./components/watched-list";
import Loader from "./components/loader";
import MovieDetails from "./components/movie-details";

const API_KEY = "f297a5f8";

export default function App() {
  const [query, setQuery] = useState("inception");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleRemoveWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
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

    getMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onSelect={handleSelect} />
          )}
          {error && <div className="error">{error}</div>}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onClose={handleClose}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
