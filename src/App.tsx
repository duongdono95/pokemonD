import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from 'axios';
import { PokemonUrl, PokeDetails } from './interface';
import PokemonCollection from "./components/PokemonCollection/PokemonCollection";
import Modal from "./components/Modal/Modal";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [pokemons, setPokemons] = useState<PokemonUrl[]>([])
  const [pokeNames, setPokeNames] = useState<string[]>([])
  const [renderingPokemons, setRenderingPokemons] = useState<PokemonUrl[]>([])
  const [modal, setModal] = useState<Boolean>(false)
  const [modalData, setModalData] = useState<PokeDetails|undefined>()
  const [showSearchBar, setShowSearchBar] = useState<Boolean>(true)
  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1154')
      res.data.results.forEach((poke:PokemonUrl) => {
        setPokemons((p)=> [...p, poke])
        setPokeNames((p)=> [...p, poke.name])
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
      setModalData(res.data);
      setModal(true);
      setShowSearchBar(false)
    };
    getPokeDetails();
  }
  // --------------Handle Quit Modal Request ------------------ //
  const hideModal = () => {
    setModal(false);
    setShowSearchBar(true)
  }
  return (
    <div className="App">
      {modal && modalData !== undefined && (
        <Modal data={modalData} handleQuitRequest={hideModal}/>
        )}
      <h1>Pokedex</h1>
      {showSearchBar && <SearchBar pokeNames={pokeNames} />}
      <div className="wrapper">
        <div className="container">
          <PokemonCollection handleRequest={viewPokeData} data={renderingPokemons} />
          <button className='load_more_btn' onClick={loadMorePokes}>Load More</button>
        </div>
      </div>

    </div>
  );
}

export default App;
