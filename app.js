const pokedex = document.querySelector("#pokedex");
const pokeName = document.querySelector("#pokeName");
const pokeImg = document.querySelector("#pokeImg");
const statsDiv = document.querySelector("#pokeStats");
const info = document.querySelector("#pokeInfo");
const hp = document.querySelector("#pokeHP");
const pokeType = document.querySelector("#pokeType");
const moveTop = document.querySelector("#moveTop");
const moveTopDesc = document.querySelector("#moveTopDesc");

const btnRandom = () => window.location.reload();

let pokeMon = Math.floor(Math.random() * 151) + 1;

const pokemons = new Request(`https://pokeapi.co/api/v2/pokemon/${pokeMon}`);
const pokeSpecies = new Request(`https://pokeapi.co/api/v2/pokemon-species/${pokeMon}`);

const renderPokemon = async () => {
  const pokemon = await fetch(pokemons);
  const pokeData = await pokemon.json();
  
  const types = pokeData.types;
  
  pokeName.textContent = `
  ${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}
  `;
  
  hp.textContent = `
  ${pokeData.stats[0].base_stat} 
  ${pokeData.stats[0].stat.name.toUpperCase()}`;
  
  pokeImg.src = pokeData.sprites.other["official-artwork"].front_default;
  
  pokeType.textContent = `
  ${types[0].type.name.charAt(0).toUpperCase() + types[0].type.name.slice(1)} Pokemon. 
  Length: ${pokeData.height * (0.1).toFixed(1)}m, 
  Weight: ${pokeData.weight * (0.1).toFixed(1)}kg`;

  const pokeSpeciesRes = await fetch(pokeSpecies);
  const pokeSpeciesData = await pokeSpeciesRes.json();

  info.textContent = pokeSpeciesData.flavor_text_entries
    .find(({ language, version }) => {
      return language.name === "en" && version.name === "red";
    }).flavor_text.replace("\u000c", "\n");

  pokedex.style.backgroundColor = pokeSpeciesData.color.name;
};

renderPokemon();
