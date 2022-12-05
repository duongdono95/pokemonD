export interface PokemonUrl {
  name : string;
  url : string;
}
export interface PokeDetails {
  name : string;
  id : number;
  abilities :{
    ability:string;
    name:string;
    base_experience: number;
  }[]
}