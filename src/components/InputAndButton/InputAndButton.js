import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./InputAndButton.css";
import axios from "axios";
import {
  typedValue,
  fetchingPokNames,
  fetchingPokColors,
  singlePokInfo,
  pokColor,
  newPokemon,
  ifThereIsAName,
  ifThereIsNoName,
  ifThereIsAColor,
  ifThereIsNoColor,
  unsort
} from "../../store/actions";

class InputAndButton extends Component {
  state = {
    pokemon: []
  };

  onChangeHandler = event => {
    let typed = event.target.value;
    this.props.typedVal(typed);
  };

  // Fetching the images and names of pokemons by color
  pokemonHandler = () => {
    this.props.pokemonColor.forEach(pok => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pok}/`)
        .then(res => {
          this.setState(prevState => ({
            pokemon: [
              ...prevState.pokemon,
              {
                name: res.data.name,
                img: res.data.sprites.front_shiny
              }
            ]
          }));
          this.props.newPokemon(this.state.pokemon);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  buttonClickedHandler = () => {
    const pokNames = this.props.pokemonNames;
    let searchVal = this.props.inputValue;
    const colorNames = this.props.pokemonColors;

    if (searchVal === "") {
      return;
    }

    // Checking if pokemon names array contains the input value
    let isThereName = pokNames.indexOf(searchVal);

    if (isThereName !== -1) {
      this.props.ifThereIsAName();
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchVal}/`)
        .then(response => {
          let abilities = [];
          let ability = [];

          for (let key in response.data.abilities) {
            abilities.push({
              ...response.data.abilities[key]
            });
          }
          for (let key in abilities) {
            ability.push({
              ...abilities[key].ability
            });
          }

          const abilitiesArr = ability.map(abi => abi.name);
          this.props.singlePokInfo(
            response.data.weight,
            response.data.height,
            abilitiesArr,
            response.data.name,
            response.data.name,
            response.data.sprites.front_shiny
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.ifThereIsNoName();
    }

    // Checking if pokemon colors array contain the input value
    let isThereColor = colorNames.indexOf(searchVal);
    if (isThereColor !== -1) {
      this.props.ifThereIsAColor();
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-color/${searchVal}/`)
        .then(response => {
          const fetchedColor = [];
          for (let key in response.data.pokemon_species) {
            fetchedColor.push({
              ...response.data.pokemon_species[key],
              id: key
            });
          }
          const pokColor = fetchedColor.map(pok => pok.name);
          this.props.pokColor(pokColor);
          this.pokemonHandler();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.ifThereIsNoColor();
      return;
    }
    this.setState({ pokemon: [] });
    this.props.unsort();
  };

  render() {
    return (
      <div className={classes.App}>
        <h2
          style={{
            color: "white"
          }}
        >
          Search pokemons by name or color
        </h2>
        <input
          className={classes.Input}
          type="text"
          onChange={this.onChangeHandler}
        />
        <button className={classes.Button} onClick={this.buttonClickedHandler}>
          Find
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputVal,
    pokemonNames: state.pokemons,
    pokemonColors: state.pokColorNames,
    pokemonColor: state.pokemonColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    typedVal: value => dispatch(typedValue(value)),
    fetchingPokNames: names => dispatch(fetchingPokNames(names)),
    fetchingPokColors: colors => dispatch(fetchingPokColors(colors)),
    singlePokInfo: (
      pokWeight,
      pokHeight,
      pokAbilities,
      singlePokName,
      pokList,
      pokImg
    ) =>
      dispatch(
        singlePokInfo(
          pokWeight,
          pokHeight,
          pokAbilities,
          singlePokName,
          pokList,
          pokImg
        )
      ),
    pokColor: color => dispatch(pokColor(color)),
    newPokemon: pokemon => dispatch(newPokemon(pokemon)),
    ifThereIsAName: () => dispatch(ifThereIsAName()),
    ifThereIsNoName: () => dispatch(ifThereIsNoName()),
    ifThereIsAColor: () => dispatch(ifThereIsAColor()),
    ifThereIsNoColor: () => dispatch(ifThereIsNoColor()),
    unsort: () => dispatch(unsort())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputAndButton);
