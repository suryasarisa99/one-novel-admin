import { useState, useEffect, useCallback, useRef } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import "./components.scss";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  options: string[];
  sortOn: string;
  setSortOn: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
  onClear,
  options,
  sortOn,
  setSortOn,
}: SearchBarProps) {
  const [showOptions, setShowOptions] = useState(false);
  const selectElmRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="search-bar">
      <div className="search-input-outer">
        <div
          className="search-icon"
          onClick={() => {
            setShowOptions(!showOptions);
            // selectElmRef.current?.click();
            setTimeout(() => {
              if (!selectElmRef.current) return;
              selectElmRef.current.style.display = "initial";

              selectElmRef.current?.focus();
            }, 100);
          }}
        >
          <MdSearch size={24} />
        </div>
        {showOptions && (
          <select
            ref={selectElmRef}
            value={sortOn}
            onChange={(e) => {
              setShowOptions(false);
              setSortOn(e.target.value);
              selectElmRef.current!.style.display = "none";
            }}
          >
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"Search By " + sortOn}
          onFocus={() => {
            setShowOptions(false);
            selectElmRef.current!.style.display = "none";
          }}
        />

        {value && (
          <MdClose
            size={20}
            onClick={() => {
              onClear();
            }}
          />
        )}
      </div>
    </div>
  );
}
