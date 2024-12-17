const POKEAPI_URL = "https://pokeapi.co/api/v2";

export const resolvers = {
    Query: {
      // Resolver para obtener un Pokémon por ID o nombre
      pokemon: async (
        _: unknown,
        { id, name }: { id?: string; name?: string }
      ): Promise<any> => {
        try {
          let apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  
          // Si se pasa un ID o nombre, ajustar la URL
          if (id) apiUrl += id;
          else if (name) apiUrl += name;
  
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch Pokémon with ID/Name: ${id || name}`);
          }
          const data = await response.json();
  
          // Devolver datos relevantes del Pokémon
          return {
            id: data.id,
            name: data.name,
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
          };
        } catch (error) {
          console.error("Error fetching Pokémon:", error);
          throw new Error("Could not fetch Pokémon data.");
        }
      },
  
      // Resolver para obtener una lista infinita de Pokémon
      infinitePokemons: async (): Promise<any[]> => {
        try {
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch infinite Pokémon list.");
          }
          const data = await response.json();
  
          // Mapear los resultados a un formato simple
          return data.results.map((pokemon: any, index: number) => ({
            id: index + 1, // Asignar un ID incremental
            name: pokemon.name,
          }));
        } catch (error) {
          console.error("Error fetching infinite Pokémon list:", error);
          throw new Error("Could not fetch infinite Pokémon data.");
        }
      },
    },
  };
  