const searchButtonEl = document.getElementById("search-button");
const searchInputEl = document.getElementById("search-input");

let allPokemons = [];
async function fetchAllPokemons() {
    let data = await fetchData(`https://pokeapi.co/api/v2/pokemon/`);

    while (data.next != null) {
        allPokemons = allPokemons.concat(data.results);
        data = await fetchData(data.next);
    }
    allPokemons.sort((a,b) => {return a.name > b.name}); // sort alphebatically
    console.log(allPokemons);
}
fetchAllPokemons();

async function fetchPokemonByName(value) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    const json = await data.json();
    console.log(json);

    document.getElementById("picture").src = json.sprites["front_default"];
    console.log((JSON.stringify(json.sprites["front_default"])));
}

async function fetchData(url) {
    const data = await fetch(url);
    return await data.json();
}

searchInputEl.addEventListener("input", () => {
    let results = [];
    let userInput = searchInputEl.value;
    results = allPokemons.filter(value => {
        return value.name.slice(0,userInput.length) == searchInputEl.value;
    })
    console.log(results);
})
searchButtonEl.addEventListener("click", () => {
    fetchPokemonByName(searchInputEl.value);
})