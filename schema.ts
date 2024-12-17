export const schema = `#graphql
type Ability {
  name: String!
  url: String!
  is_hidden: Boolean
  slot: Int!
  effect: String # Nuevo campo opcional para el efecto
}

type Move {
  name: String!
  url: String!
}

type Type {
  name: String!
  url: String!
  slot: Int!
}

type Pokemon {
  id: ID!
  name: String!
  base_experience: Int!
  height: Int!
  weight: Int!
  abilities: [Ability!]!
  types: [Type!]!
  moves: [Move!]! # Nuevo campo para movimientos
}

type Query {
  pokemon(id: ID, name: String): Pokemon
  abilities: [Ability!]!
}

`;
