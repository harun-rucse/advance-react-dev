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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorage([], "watched");
  const { loading, movies, error } = useMovies(query, handleClose);

  function handleSelect(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleClose() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatched(id) {
    const filteredWatched = watched.filter((movie) => movie.imdbID !== id);
    setWatched(filteredWatched);
  }

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
