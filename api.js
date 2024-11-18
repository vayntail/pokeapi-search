export let allPokemons = [];

export async function fetchAllPokemons() {
  let data = await fetchData(`https://pokeapi.co/api/v2/pokemon/`);

  while (data.next != null) {
    allPokemons = allPokemons.concat(data.results);
    data = await fetchData(data.next);
  }
  allPokemons.sort((a, b) => {
    return a.name > b.name;
  }); // sort alphebatically
}

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json(); // return as json
}

export async function fetchPokemonByName(value) {
  const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${value}`);
  return data; // Return the data
}
