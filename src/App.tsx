import React, {useEffect, useState} from 'react';
import './App.scss'
import axios from 'axios';
import { PokemonUrl } from './interface';
import PokemonCollection from "./components/PokemonCollection";

function App() {
  const [pokemons, setPokemons] = useState<PokemonUrl[]>([])
  const [renderingPokemons, setRenderingPokemons] = useState<PokemonUrl[]>([])
  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1154')
      res.data.results.forEach((poke:PokemonUrl) => {
        setPokemons((p)=> [...p, poke])
      })
    }
    getPokemons()

  },[])
  useEffect(()=> {
    setRenderingPokemons(pokemons.slice(0, 10))
  },[pokemons])
  const loadMorePokes = (renderingPokemons: PokemonUrl[]) => {
    setRenderingPokemons
  }
  return (
    <div className="App">
      <div className="pokemons__container">
        <h1>Pokedex</h1>
        <PokemonCollection data={renderingPokemons}/>
        <button className='load_more_btn' onClick={loadMorePokes}>Load More</button>
      </div>
    </div>
  );
}

export default App;
