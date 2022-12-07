import React from 'react'
import { PokemonUrl } from '../../interface'
import './PokemonCollection.scss'
interface Props {
  data: PokemonUrl[];
  handleRequest : (request: string) => void
}
const PokemonCollection:React.FC<Props> = (props) => {
  return (
    <div className='pokemons'>
      {props.data.map((pokemon, index) => {
         const handleName = () => {
          props.handleRequest(pokemon.name)
        }
        return (
          <div className='pokemon_details' key={index}>
            <p>{pokemon.name.toUpperCase()}</p>
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt="Bulbasaur"/>
            <button onClick={handleName}>Read More</button>
          </div>
        )
      })}
    </div>
  )
}

export default PokemonCollection