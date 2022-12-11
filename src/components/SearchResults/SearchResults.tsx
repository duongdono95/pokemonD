import React, {useEffect} from 'react'
import './SearchResults.scss'

interface Props {
  data:string[];
}

const SearchResults:React.FC<Props> = (props) => {
  return (
    <div className="popup__container">
      {props.data.map((item, index) => {
        return (
          <div key={index} className="matching__poke">
            <img src={`https://img.pokemondb.net/sprites/home/normal/${item}.png`} alt="" />
            <h3>{item}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default SearchResults