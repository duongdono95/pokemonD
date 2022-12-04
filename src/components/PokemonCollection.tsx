import React from 'react'
import { PokemonUrl } from '../interface'
import './PokemonCollection.scss'
interface Props {
  data: PokemonUrl[]
}
const PokemonCollection:React.FC<Props> = (props) => {
  return (
    <div className='pokemons'>
      {props.data.map((pokemon, index) => {
        return (
          <div className='pokemon_details' key={index}>
            <p>{pokemon.name.toUpperCase()}</p>
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt="Bulbasaur"/>
            <button>Read More</button>
          </div>
        )
      })}
    </div>
  )
}

export default PokemonCollection