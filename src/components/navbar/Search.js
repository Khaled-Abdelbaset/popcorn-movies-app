import { useRef } from "react";
import { useKey } from "../../custom-hooks/useKey";

export function Search({ query, setQuery }) {
  const inputField = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement === inputField.current) return;
    inputField.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(() => e.target.value)}
      ref={inputField}
    />
  );
}
