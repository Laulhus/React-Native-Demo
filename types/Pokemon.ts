export type Pokemon = {
  name: string;
  sprites: {front_default: string};
  types: PokemonType[];
};

type PokemonType = {
  type: {name: string};
};
