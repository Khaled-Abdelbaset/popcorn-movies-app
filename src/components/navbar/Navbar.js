import { Logo } from "./Logo";
import { Search } from "./Search";
import { NumResults } from "./NumResults";

export function Navbar({ query, setQuery, movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  );
}
