import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export function SearchBar({onSearch}: Props): JSX.Element {
  const [value, setValue] = useState("");
  return (
    <div className="sm:w-1/2 text-2xl ">
      <h1 className="text-center pb-2 text-white">What are you looking for today?</h1>
      <div className="w-full inline-block relative text-gray-700">
        <input
          type="text"
          spellCheck="false"
          className="text-center w-full border border-gray-500 rounded-full indent-5 pr-12 py-2 focus:outline-none focus:border-sky-500 hover:bg-zinc-50 transition transform duration-300"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button className="absolute right-4 top-2.5" onClick={() => onSearch(value)}>
          <FontAwesomeIcon size="xs" icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
