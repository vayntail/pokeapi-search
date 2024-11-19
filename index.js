import * as Api from "./api.js";

const searchButtonEl = document.querySelector(".search-button");
const searchInputEl = document.querySelector(".search-input");
const searchResultsEl = document.querySelector(".search-results-list");
const displayInfoEl = document.querySelector("#display-info");
const x = document.querySelector("#clone-sprite-item");

Api.fetchAllPokemons();

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

    const name = document.createElement("p");
    name.id = "name";
    name.textContent = value.name;

    li.appendChild(img);
    li.appendChild(name);
    li.classList.add("search-result-item");

    // add to list
    searchResultsEl.append(li);

    // if any are clicked, display the data
    li.addEventListener("click", () => {
      console.log("clicked");
      displayInfoEl.style.display = "flex";
      displayData(data);
    });
  } else {
    throw Error(`Failed to fetch data for ${value.name}`);
  }
}

function displayData(data) {
  searchResultsEl.innerHTML = "";
  displayInfoEl.querySelector("#sprites-grid").innerHTML = "";
  displayInfoEl.querySelector("h1").innerText = data.name;
  displayInfoEl.querySelector("img").src =
    data.sprites.other["official-artwork"].front_default;
  console.log(data);

  Object.entries(data.sprites).forEach(([key, value]) => {
    if (value != null && typeof value == "string") {
      console.log(key);

      let h = x.cloneNode(true);
      h.style.display = "block";
      h.querySelector("h2").innerText = key;
      h.querySelector("img").src = value;
      displayInfoEl.querySelector("#sprites-grid").append(h);
    }
  });
}

// Events
searchInputEl.addEventListener("input", () => handleSearchResults());
searchInputEl.addEventListener("focusin", () => handleSearchResults());
searchInputEl.addEventListener("focusout", (event) => {
  // console.log("focus out");
  // searchResultsEl.innerHTML = "";
});

searchButtonEl.addEventListener("click", () => {
  Api.fetchPokemonByName(searchInputEl.value);
});
