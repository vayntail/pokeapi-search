import * as Api from "./api.js";

const searchButtonEl = document.getElementById("search-button");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.getElementById("search-results-list");

Api.fetchAllPokemons();

function displayData(data) {
  console.log(data);
}

function handleSearchResults() {
  searchResultsEl.innerHTML = "";
  let results = [];
  let userInput = searchInputEl.value;
  console.log(userInput);

  // for each pokemon that fits the typed letters:
  results = Api.allPokemons.filter((value) => {
    if (value.name.slice(0, userInput.length) == searchInputEl.value) {
      // make search result list item
      // call pokemond data
      createSearchResultItem(value);
      return value;
    }
  });
  console.log(results); // check
  if (results.length == 0) {
    searchResultsEl.innerHTML = "";
  }
}

async function createSearchResultItem(value) {
  // fetch pokemon's data
  const data = await Api.fetchPokemonByName(value.name);

  if (data) {
    const placeholderImg = "https://via.placeholder.com/150?text=Loading";

    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = placeholderImg; // Set the placeholder initially
    img.alt = value.name;

    img.onload = () => {
      img.src = data.sprites.front_default; // Change to the real image after loading
    };

    const name = document.createElement("h1");
    name.id = "name";
    name.textContent = value.name;

    li.appendChild(img);
    li.appendChild(name);
    li.classList.add("search-result-item");

    // add to list
    searchResultsEl.append(li);
  } else {
    throw Error(`Failed to fetch data for ${value.name}`);
  }

  //   li.innerHTML = `<img src="${data.sprites.front_default}" />
  //           <p id="name">${value.name}</p>`;
  //   li.classList.add("search-result-item");

  //   // add to list
  //   searchResultsEl.append(li);
}

// Events
searchInputEl.addEventListener("input", () => handleSearchResults());
searchButtonEl.addEventListener("click", () => {
  Api.fetchPokemonByName(searchInputEl.value);
});
