import React from 'react'
import './Modal.scss'
import { PokeDetails } from "../../interface"
interface Props {
  data : PokeDetails;
  handleQuitRequest: () => void;
}

const Modal:React.FC<Props> = (props) => {
  const {data} = props

  return (
    <div className="modal">
          <div className="modal__container">
            <div className="escape__btn">
              <i className="fa-solid fa-x" onClick={props.handleQuitRequest}></i>
            </div>
            <h1>{data.id} - {data.name.toUpperCase()}  </h1>
            <div className="img__container">
              <div className="img__card">
                <img src={`https://img.pokemondb.net/sprites/home/normal/${data.name}.png`} alt={data.name}/>
                <p>Normal</p>
              </div>
              <div className="img__card">
                <img src={`https://img.pokemondb.net/sprites/home/shiny/${data.name}.png`} alt={data.name}/>
                <p>Shyny</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
            <div className="modal__item">
              <h3>Weight:</h3>
              <div className="detail__group">
                <p><b>{data.weight}</b> Kg</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
            <div className="modal__item">
              <h3>Height:</h3>
              <div className="detail__group">
                <p><b>{data.height}</b> Inch</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
            <div className="modal__item">
              <h3>Base Experience:</h3>
              <div className="detail__group">
                <p><b>{data.base_experience}</b> Exp</p>
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
            <div className="modal__item">
              <h3>Abilities:</h3>
              <div className="details__group">
                {data.abilities.map((ability) => {
                  return <p>{ability.ability.name}</p>
                })}
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
            <div className="modal__item">
              <h3>Type:</h3>
              <div className="details__group">
                {data.types.map((type) => {
                  return <p>{type.type.name}</p>
                })}
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
            <div className="modal__item">
              <h3>Stats:</h3>
              <div className="stat__group">
                {data.stats.map((i) => {
                  return  <div className="stat__detail">
                    <h5>{i.stat.name.toUpperCase()} :</h5>
                    <p>{i.base_stat}</p>
                  </div>
                })}
              </div>
            </div>
            <div className="spacer-horizontal"></div>
{/* --------------------------------------------------------------- */}
          </div>
        </div>
  )
}

export default Modal