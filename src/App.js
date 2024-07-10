import { useState } from "react";
import { useMovies } from "./custom-hooks/useMovies";
import { useLocalStorageState } from "./custom-hooks/useLocalStorageState";
import { Loader } from "./components/helpers/Loader";
import { ErrorMessage } from "./components/helpers/ErrorMessage";
import { Navbar } from "./components/navbar/Navbar";
import { MovieDetails } from "./components/Movies/MovieDetails";
import { Watched } from "./components/watched-movies/Watched";
import { MovieList } from "./components/Movies/MovieList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  function handelAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handelSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handelCloseMovie() {
    setSelectedID(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handelSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieDetails
                  onAddWatched={handelAddWatched}
                  selectedID={selectedID}
                  onCloseMovie={handelCloseMovie}
                  watched={watched}
                />
              )}
              {error && <ErrorMessage message={error} />}
            </>
          ) : (
            <Watched watched={watched} onDeleteWatched={handleDeleteWatched} />
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
