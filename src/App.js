import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchingPokNames, fetchingPokColors } from "./store/actions";
import "./App.css";
import Aux from "./hoc/Auxx";
import axios from "axios";
import InputAndButton from "../src/components/InputAndButton/InputAndButton";
import Dinamic from "../src/components/Dinamic/Dinamic";

class App extends Component {
  componentDidMount() {
    // Fetching pokemon names
    axios.get("https://pokeapi.co/api/v2/pokemon/").then(response => {
      const fetchedPokemons = [];
      for (let key in response.data.results) {
        fetchedPokemons.push({
          ...response.data.results[key],
          id: key
        });
      }
      const pokNames = fetchedPokemons.map(pok => pok.name);
      this.props.fetchingPokNames(pokNames);
    });

    // Fetching all pokemon colors
    axios
      .get("https://pokeapi.co/api/v2/pokemon-color/")
      .then(res => {
        const fetchedColors = [];
        for (let key in res.data.results) {
          fetchedColors.push({
            ...res.data.results[key],
            id: key
          });
        }
        const pokColorNames = fetchedColors.map(color => color.name);
        this.props.fetchingPokColors(pokColorNames);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Aux>
        <InputAndButton />
        <Dinamic />
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingPokNames: names => dispatch(fetchingPokNames(names)),
    fetchingPokColors: colors => dispatch(fetchingPokColors(colors))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
