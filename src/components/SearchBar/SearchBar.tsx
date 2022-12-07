import React from 'react';
import './SearchBar.scss';
import { useState, useEffect } from "react";
import HeadlessTippy from '@tippyjs/react/headless';



const SearchBar = () => {
  const [searchValue, setSearchValue ] = useState<string>('');


  //----------Function-----------//
  const handleChange = (e?:any) => {
    const searchValue = e?.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
    console.log(searchValue)
  }
  return (
    <div className="search__bar__container">
      <label htmlFor="search__bar"></label>
      <input  type="text" id="search__bar"
              placeholder="Search Pokemon..."
              value={searchValue}
              spellCheck={false}
              onChange={handleChange}
              />
    </div>
  )
}

export default SearchBar