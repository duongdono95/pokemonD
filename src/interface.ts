export interface PokemonUrl {
  name : string;
  url : string;
}
export interface PokeDetails {
  name : string;
  id : number;
  base_experience: number;
  weight: number;
  height : number;
  abilities :{
    ability:{
      name:string;
    }
  }[];
  types : {
    type: {
      name: string;
    }
  }[];
  stats : {
    base_stat: number;
    stat : {
      name: string;
    }
  }[];
}