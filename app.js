const pokedex = document.querySelector("#pokedex");
const pokeName = document.querySelector("#pokeName");
const pokeImg = document.querySelector("#pokeImg");
let statsDiv = document.querySelector("#pokeStats");
pokeMon = 1;

const btnRandom = () => {
  pokeMon = Math.floor(Math.random() * 151);
  renderPokemon();
};

const btnNext = () => {
  pokeMon++;
  renderPokemon();
};

const btnPrev = () => {
  pokeMon--;
  renderPokemon();
};

const renderPokemon = () => {
  statsDiv.textContent = "";
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeMon}`)
    .then((res) => res.json())
    .then((data) => {
      const stats = data.stats;

      pokeName.textContent = `#${data.id}: ${
        data.name.charAt(0).toUpperCase() + data.name.slice(1)
      }`;
      pokeImg.src = data.sprites.other.dream_world.front_default;

      stats.map((x) => {
        const pokeStat = document.createElement("p");
        pokeStat.append(`${x.stat.name}: ${x.base_stat}`);
        statsDiv.append(pokeStat);
      });

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeMon}`)
        .then((res) => res.json())
        .then((data) => {
          const info = document.querySelector("#pokeInfo");
          console.log(data);

          info.textContent = data.flavor_text_entries[0].flavor_text.replace(
            "\u000c",
            "\n"
          );
        });
    });
};

renderPokemon();
