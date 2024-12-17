export const schema = `#graphql
type Ability {
  name: String!
  url: String!
  is_hidden: Boolean
  slot: Int
}

type Type {
  name: String!
  url: String!
  slot: Int!
}

type Encounter {
  location_area: String!
  url: String!
}

type Pokemon {
  id: Int!
  name: String!
  base_experience: Int
  height: Int
  weight: Int
  abilities: [Ability!]!
  types: [Type!]!
  encounters: [Encounter!]!
}

type Query {
  pokemon(id: Int, name: String): Pokemon
  infinitePokemons(url: String): [Pokemon!]!
}
`;
