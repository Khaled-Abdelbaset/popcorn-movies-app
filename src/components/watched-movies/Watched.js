import { WatchedList } from "./WatchedList";
import { WatchedSummary } from "./WatchedSummary";

export function Watched({ watched, onDeleteWatched }) {
  return (
    <>
      <WatchedSummary watched={watched} />
      <WatchedList watched={watched} onDeleteWatched={onDeleteWatched} />
    </>
  );
}