import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from "./@vercel/analytics"

injectSpeedInsights();
inject();

const URL = "https://pokeapi.co/api/v2/pokemon/";

const input = document.getElementById("search-input");
const notFoundDiv = document.getElementById("not-found");

const pokemons = document.querySelector(".pokemons");

for (let i = 1; i <= 204; i++) {
  fetch(URL + i)
    .then((response) => {
      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      // Convierte la respuesta a formato JSON
      return response.json();
    })
    .then((data) => {
      showPokemons(data);
    });
}
function showPokemons(data) {
  // console.log(data);

  const pokemon = document.createElement("div");
  pokemon.classList.add("pokemon");

  pokemon.innerHTML += `
        <img src="${data.sprites.other["official-artwork"].front_default}"
        alt="${data.name}">
        <div class="info">
            <h2>${data.name}</h2>
            <p>${data.id}</p>
            <p>${data.stats[0].base_stat} HP / ${data.stats[1].base_stat} Atk / ${data.stats[2].base_stat} Def / ${data.stats[3].base_stat} SpA / ${data.stats[4].base_stat} SpD / ${data.stats[5].base_stat} Spe</p>
        </div>
        `;
  pokemons.appendChild(pokemon);
}

input.addEventListener("input", (e) => {
  const searchTerm = input.value.toLowerCase();
  const pokemonItems = document.querySelectorAll(".pokemon");
  let found = false;

  pokemonItems.forEach((item) => {
    const pokemonName = item.querySelector("h2").textContent.toLowerCase();
    // console.log(pokemonName);

    // Mostrar u ocultar el Pokémon dependiendo de la coincidencia en el nombre
    if (pokemonName.includes(searchTerm)) {
      item.style.display = "block";
      found = true;
    } else {
      item.style.display = "none";
    }

    if (!found) {
      notFoundDiv.innerHTML = `<h1>No se encontró ningún Pokémon con el nombre: ${searchTerm}</h1>`;
    } else {
      notFoundDiv.innerHTML = "";
    }
  });
});
