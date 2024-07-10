import { useEffect, useState } from "react";
import { useKey } from "../../custom-hooks/useKey";
import { Loader } from "../helpers/Loader";
import StarRating from "../Rating/StarRating";

const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;

export function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const userWatchedRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = details;

  function handelAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      runtime: runtime.split(" ").at(0),
      imdbRating: Number(imdbRating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      if (title) document.title = `Movie | ${title}`;
      return function () {
        document.title = "Popcorn";
      };
    },
    [title]
  );

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${IMDB_API_KEY}&i=${selectedID}`
        );
        if (!res.ok) {
          throw new Error("Error in fetching movie details");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie Details Not Found ⛔");
        }
        setDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }
    getMovieDetails();
  }, [selectedID]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handelAddWatched}>
                      + Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  you rated this movie {userWatchedRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
