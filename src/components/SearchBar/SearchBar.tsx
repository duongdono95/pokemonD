import React from 'react';
import './SearchBar.scss';
import { useState,useEffect,  useRef } from "react";
import HeadlessTippy from '@tippyjs/react/headless';
import { useDebounce } from "../../hooks/Debounce";
import { PokemonUrl } from '../../interface'

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
    const searchPoke = (searchValue:string) => {
      const match = props.pokeNames.filter((pokeName) => {
        if (pokeName.includes(searchValue)){
          return true
        }
      })
      console.log(match)
    }

  },[debouncedValue])



  const handleChange = (e?:any) => {
    const searchValue = e?.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
    searchPoke(searchValue)
  }
  return (
    <div className="search__bar__container">
      <HeadlessTippy
        interactive
        // add rendering conditions to avoid showing search results when the input is empty
        render={(attrs) => (
          <div className="search__results" tabIndex={1} {...attrs}>

          </div>
        )}
        visible={showResult && searchResult.length > 0}
      >
        <div className="search__bar">
          <input  type="text" id="search__bar"
                  placeholder="Search Pokemon..."
                  value={searchValue}
                  spellCheck={false}
                  onChange={handleChange}
                  />
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default SearchBar