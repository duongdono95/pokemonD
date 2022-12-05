import React, {useEffect, useState} from 'react';
import './App.scss'
import axios from 'axios';
import { PokemonUrl, PokeDetails } from './interface';
import PokemonCollection from "./components/PokemonCollection";

function App() {
  const [pokemons, setPokemons] = useState<PokemonUrl[]>([])
  const [renderingPokemons, setRenderingPokemons] = useState<PokemonUrl[]>([])
  const [modalData, setModalData] = useState<PokeDetails>()
  const [modal, setModal] = useState<Boolean>(false)
  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1154')
      res.data.results.forEach((poke:PokemonUrl) => {
        setPokemons((p)=> [...p, poke])
      })
    }
    getPokemons()

  },[])
  // ----------------Rendering Pokemons ------------- //
  useEffect(()=> {
    setRenderingPokemons(pokemons.slice(0, 10))
  },[pokemons])

  // ----------------LoadMore Pokemons ------------- //
  const loadMorePokes = () => {
    const nextPokeArray =  pokemons.slice(renderingPokemons.length, renderingPokemons.length+10);
    nextPokeArray.forEach((poke) => {
      setRenderingPokemons((p)=> [...p, poke])
    })
  }
  // ----------------Get Data from Child ------------- //
  const viewPokeData = (request:string) => {
    const getPokeDetails = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${request}`)
      setModalData(res.data)
    };
    getPokeDetails()

  }
  // ----------------------------------- Keeping Working on Modal DATA from here ----------------------------------
  return (
    <div className="App">
      {modal && (
        <div className="modal">

        </div>
      )}
      <div className="pokemons__container">
        <h1>Pokedex</h1>
        <PokemonCollection handleRequest={viewPokeData} data={renderingPokemons} />
        <button className='load_more_btn' onClick={loadMorePokes}>Load More</button>
      </div>

    </div>
  );
}

export default App;
