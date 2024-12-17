// Representa una habilidad de un Pokémon
export interface Ability {
    name: string;
    url: string;
    is_hidden?: boolean; // Algunas habilidades pueden no tener este campo
    slot: number;
  }
  
  // Representa un tipo de Pokémon
  export interface Type {
    name: string;
    url: string;
    slot: number;
  }
  
  // Representa un área de encuentro de un Pokémon
  export interface Encounter {
    location_area: string;
    url: string;
  }
  
  // Representa la estructura completa de un Pokémon
  export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: Ability[];
    types: Type[];
    encounters?: Encounter[]; // Los encuentros son opcionales
  }
  