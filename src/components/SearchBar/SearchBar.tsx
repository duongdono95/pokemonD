import React from 'react';
import './SearchBar.scss';
import { useState,useEffect,  useRef } from "react";
import HeadlessTippy from '@tippyjs/react/headless';
import { useDebounce } from "../../hooks/Debounce";
import SearchResults from "../SearchResults/SearchResults";


interface Props {
  pokeNames: string[]
}

const SearchBar:React.FC<Props> = (props) => {
  const [searchValue, setSearchValue ] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  //----------Function-----------//
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const searchingPokes = () => {
      const matchedPokemons = props.pokeNames.filter((pokeName) => {
        if (pokeName.includes(debouncedValue)) {
          return true
        }
      })
      matchedPokemons.forEach((poke) => {
        setSearchResult((p)=>[...p , poke])
      })
    }

    searchingPokes()
  },[debouncedValue, props.pokeNames])
  const handleChange = (e?:any) => {
    const searchValue = e?.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  return (
    <div className="search__bar__container">
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0 }
        // add rendering conditions to avoid showing search results when the input is empty
        render={(attrs) => (
          <div className="search__results" tabIndex={1} {...attrs}>
            <SearchResults data={searchResult} />
          </div>
        )}
      >
        <div className="search__bar">
          <input  type="text" id="search__bar"
                  placeholder="Search Pokemon..."
                  value={searchValue}
                  spellCheck={false}
                  onChange={handleChange}
                  onFocus={() => {setShowResult(true)}}
                  />
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default SearchBar