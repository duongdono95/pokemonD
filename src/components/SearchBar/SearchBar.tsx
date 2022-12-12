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
  const [loading, setLoading] = useState<boolean>(false)

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  //----------Function-----------//
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const searchingPokes = () => {
      setSearchResult([])
      setLoading(true)
      const matchedPokemons = props.pokeNames.filter((pokeName) => {
        if (pokeName.includes(debouncedValue)) {
          return true
        }
      })
      matchedPokemons.forEach((poke) => {
        setSearchResult((p)=>[...p , poke])
        setLoading(false)
      })
    }

    searchingPokes()
  },[debouncedValue, props.pokeNames])

  const handleChange = (e?:any) => {
    setSearchValue('')
    const searchValue = e?.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handleHideResults = () => {
    setShowResult(false)
    setLoading(false)
    setSearchValue('')
  }

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    setShowResult(false);
    setLoading(false)
  }
  return (
    <div className="search__bar__container">
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0 }
        placement="bottom"
        onClickOutside={handleHideResults}
        render={(attrs) => (
          <div className="search__results" tabIndex={-1} {...attrs}>
            <SearchResults data={searchResult} />
          </div>
        )}
      >
        <div className="search__bar">
          <input
          type="text" id="search__bar"
          placeholder="Search Pokemon..."
          value={searchValue}
          spellCheck={false}
          onChange={handleChange}
          onFocus={() => {setShowResult(true)}}
          />
          {!!searchValue && !loading && (
            <button className="clear" onClick={handleClear}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
          {loading && <i className="fa-solid fa-spinner loading"></i>}
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default SearchBar