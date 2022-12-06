import React, {useEffect, useState} from 'react';
import './App.scss'
import axios from 'axios';
import { PokemonUrl, PokeDetails } from './interface';
import PokemonCollection from "./components/PokemonCollection";

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
  // ----------------------------------- Keeping Working on Modal DATA from here ----------------------------------
  console.log(modalData?.base_experience)
  return (
    <div className="App">
      {modal && (
        <div className="modal">
          <div className="modal__container">
            <div className="escape__btn" onClick={() => {setModal(false)}}>
              <i className="fa-solid fa-x"></i>
            </div>
            <h1>{modalData?.id} - {modalData?.name.toUpperCase()}  </h1>
            <div className="img__container">
              <div className="img__card">
                <img src={`https://img.pokemondb.net/sprites/home/normal/${modalData?.name}.png`} alt={modalData?.name}/>
                <p>Normal</p>
              </div>
              <div className="img__card">
                <img src={`https://img.pokemondb.net/sprites/home/shiny/${modalData?.name}.png`} alt={modalData?.name}/>
                <p>Shyny</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>

            <div className="modal__item">
              <h3>Weight:</h3>
              <div className="detail__group">
                <p><b>{modalData?.weight}</b> Kg</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>

            <div className="modal__item">
              <h3>Height:</h3>
              <div className="detail__group">
                <p><b>{modalData?.height}</b> Inch</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>

            <div className="modal__item">
              <h3>Base Experience:</h3>
              <div className="detail__group">
                <p><b>{modalData?.base_experience}</b> Exp</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>

            <div className="modal__item">
              <h3>Abilities:</h3>
              <div className="details__group">
                {modalData?.abilities.map((ability) => {
                  return <p>{ability.ability.name}</p>
                })}
              </div>
            </div>
            <div className="spacer-horizontal"></div>

            <div className="modal__item">
              <h3>Type:</h3>
              <div className="details__group">
                {modalData?.types.map((type) => {
                  return <p>{type.type.name}</p>
                })}
              </div>
            </div>
            <div className="spacer-horizontal"></div>

            <div className="modal__item">
              <h3>Stats:</h3>
              <div className="stat__group">
                {modalData?.stats.map((i) => {
                  return  <div className="stat__detail">
                    <h5>{i.stat.name.toUpperCase()} :</h5>
                    <p>{i.base_stat}</p>
                  </div>
                })}
              </div>
            </div>
            <div className="spacer-horizontal"></div>

          </div>
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
