import React from "react";
import classes from "./PokemonInfo.css";

const pokemonInfo = props => (
  <div className={classes.PokemonInfo}>
    <img src={props.pokImg} alt="" />
    <p className={classes.pokInfoP}>{`Name: ${props.pokName}`}</p>
    <p className={classes.pokInfoP}>{`Height: ${props.height} cm`}</p>
    <p className={classes.pokInfoP}>{`Weight: ${props.weight} gr`}</p>
    <p className={classes.pokInfoP}>{`Abilities: ${props.abilities}.`}</p>
  </div>
);

export default pokemonInfo;
