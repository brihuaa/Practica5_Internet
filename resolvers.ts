const POKEAPI_URL = "https://pokeapi.co/api/v2";

export const resolvers = {
  Query: {
    // Obtener detalles de un Pokémon por ID o nombre
    pokemon: async (_: unknown, args: { id?: number; name?: string }) => {
      const endpoint = args.id
        ? `${POKEAPI_URL}/pokemon/${args.id}`
        : `${POKEAPI_URL}/pokemon/${args.name?.toLowerCase()}`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Pokemon not found");

      const data = await response.json();

      // Solicitar encuentros del Pokémon
      const encountersResponse = await fetch(data.location_area_encounters);
      const encounters = encountersResponse.ok
        ? await encountersResponse.json()
        : [];

      return {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: any) => ({
          name: a.ability.name,
          url: a.ability.url,
          is_hidden: a.is_hidden,
          slot: a.slot,
        })),
        types: data.types.map((t: any) => ({
          name: t.type.name,
          url: t.type.url,
          slot: t.slot,
        })),
        encounters: encounters.map((e: any) => ({
          location_area: e.location_area.name,
          url: e.location_area.url,
        })),
      };
    },

    // Solicitar infinitamente Pokémon utilizando next url
    infinitePokemons: async (_: unknown, args: { url?: string }) => {
      const endpoint = args.url || `${POKEAPI_URL}/pokemon?limit=10`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch Pokemons");

      const data = await response.json();

      // Extraer detalles de cada Pokémon
      const pokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();
          return {
            id: details.id,
            name: details.name,
            base_experience: details.base_experience,
            height: details.height,
            weight: details.weight,
            abilities: details.abilities.map((a: any) => ({
              name: a.ability.name,
              url: a.ability.url,
            })),
            types: details.types.map((t: any) => ({
              name: t.type.name,
              url: t.type.url,
              slot: t.slot,
            })),
          };
        }),
      );

      return pokemons;
    },
  },
};
