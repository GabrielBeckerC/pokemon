import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [chosen, setChosen] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    atk: "",
    def: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        console.log(response);
        setPokemonInfo({
          name: response.data.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          atk: response.data.stats[1].base_stat,
          def: response.data.stats[2].base_stat,
          type: response.data.types,
        });
        setChosen(true);
      }
    );
  };
  console.log(pokemonInfo.type);

  return (
    <div className="App">
      <div className="Title">
        <h1> Pokémon Stats </h1>
        <input
          type="text"
          onChange={(event) => setPokemonName(event.target.value)}
        />
        <button class="big-button" onClick={searchPokemon}>Procurar Pokémon</button>
      </div>
      <div className="PokemonInfo">
        {!chosen ? (
          <h1>Por favor escolha um pokémon</h1>
        ) : (
          <>
            <h1>
              {pokemonInfo.name.charAt(0).toUpperCase() +
                pokemonInfo.name.slice(1)}
            </h1>
            <img src={pokemonInfo.img} alt={pokemonInfo.name} />
            <h3>Espécie: {pokemonInfo.species}</h3>
            <h3>Tipo </h3>
            <h3>
              {pokemonInfo.type.map((type) => {
                console.log(type.type.name);
                return <button className="Type"> {type.type.name} </button>;
              })}
            </h3>
            <h4>HP: {pokemonInfo.hp}</h4>
            <h4>Ataque: {pokemonInfo.atk}</h4>
            <h4>Defesa: {pokemonInfo.def}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
