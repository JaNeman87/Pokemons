import React from "react";
import classes from "./Dinamic.css";
import PokemonInfo from "../PokemonInfo/PokemonInfo";

const dinamic = props => {
  let pokemon = null;
  let foundPokemons = null;
  let pokemonsByColor = null;

  if (props.pokemonColor !== "") {
    // Checking if sort button is pressed
    if (props.sortVal) {
      let sorted = props.pokemon.sort((a, b) => a.name.localeCompare(b.name));
      pokemonsByColor = sorted.map(pok => {
        return (
          <div className={classes.FoundPokemons} key={Math.random() * 100}>
            <div className={classes.pokNameImg}>
              <img src={pok.img} alt="" height="130px" />
              <p>{pok.name}</p>
            </div>
          </div>
        );
      });
    } else {
      pokemonsByColor = props.pokemon.map(pok => {
        return (
          <div className={classes.FoundPokemons} key={Math.random() * 100}>
            <div className={classes.pokNameImg}>
              <img src={pok.img} alt="" height="130px" />
              <p>{pok.name}</p>
            </div>
          </div>
        );
      });
    }
  }

  foundPokemons = props.pokList.map(pok => {
    return (
      <div className={classes.FoundPokemons} key={Math.random() * 100}>
        <div>
          <h5>{pok}</h5>
        </div>
      </div>
    );
  });

  if (props.pokRender) {
    pokemon = (
      <PokemonInfo
        pokImg={props.pokImg}
        pokName={props.pokName}
        height={props.height}
        weight={props.weight}
        abilities={props.abilities}
      />
    );
  }
  if (props.pokRender === false && !props.correctColor) {
    pokemon = (
      <div className={classes.PokemonInfo}>
        <p style={{ color: "red" }}>
          There is no pokemon with that name or color
        </p>
      </div>
    );
  }
  return (
    <div>
      <div style={{ textAlign: "center" }}> {pokemon}</div>
      <div style={{ textAlign: "center" }}>
        {" "}
        {props.colorSearch ? (
          <div>
            <h2 className={classes.foundText}>
              Type some of these names into the search bar to find out more!!!
            </h2>
            <button
              className={classes.sortButton}
              onClick={props.sortButtonHandler}
            >
              Sort pokemons alphabetically
            </button>
          </div>
        ) : null}
      </div>
      <div style={{ textAlign: "center" }}> {pokemonsByColor}</div>
      <div style={{ textAlign: "center" }}>
        {" "}
        {props.pokList.length > 0 ? (
          <h2 style={{ color: "white" }}>Recent Searches</h2>
        ) : null}
      </div>
      <div style={{ textAlign: "center" }}> {foundPokemons}</div>
    </div>
  );
};

export default dinamic;
