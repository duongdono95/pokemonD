import React, {useEffect, useState} from 'react';
import './App.scss'
import axios from 'axios';
import { PokemonUrl, PokeDetails } from './interface';
import PokemonCollection from "./components/PokemonCollection/PokemonCollection";
import Modal from "./components/Modal/Modal";

function App() {
  const [pokemons, setPokemons] = useState<PokemonUrl[]>([])
  const [renderingPokemons, setRenderingPokemons] = useState<PokemonUrl[]>([])
  const [modal, setModal] = useState<Boolean>(false)
  const [modalData, setModalData] = useState<PokeDetails|undefined>()
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
      setModalData(res.data);
      setModal(true);
    };
    getPokeDetails();
  }
  // --------------Handle Quit Modal Request ------------------ //
  const hideModal = () => {
    setModal(false)
  }
  return (
    <div className="App">
      {modal && modalData !== undefined && (
        <Modal data={modalData} handleQuitRequest={hideModal}/>
      )}
      <div className="wrapper">
        <h1>Pokedex</h1>
        <div className="container">
          <input type="text" id="search__bar" placeholder="Search Pokemon..."/>
          <PokemonCollection handleRequest={viewPokeData} data={renderingPokemons} />
          <button className='load_more_btn' onClick={loadMorePokes}>Load More</button>
        </div>
      </div>

    </div>
  );
}

export default App;
