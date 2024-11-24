import * as Api from "./api.js";

const searchButtonEl = document.querySelector(".search-button");
const displayInfoEl = document.querySelector("#display-info");
const x = document.querySelector("#clone-sprite-item");

Api.fetchAllPokemons();

export function displayData(data) {
  displayInfoEl.style.display = "flex";

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
      h.querySelector("p").innerText = key;
      h.querySelector("img").src = value;
      displayInfoEl.querySelector("#sprites-grid").append(h);
    }
  });
}

searchButtonEl.addEventListener("click", () => {
  Api.fetchPokemonByName(searchInputEl.value);
});
