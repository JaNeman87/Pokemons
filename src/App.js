import React, { Component } from "react";
import "./App.css";
import Aux from "./hoc/Auxx";
import axios from "axios";
import InputAndButton from "../src/components/InputAndButton/InputAndButton";
import Dinamic from "../src/components/Dinamic/Dinamic";

class App extends Component {
  state = {
    pokemons: [],
    pokemonColor: [],
    inputVal: "",
    pokWeight: [],
    pokHeight: [],
    pokAbilities: [],
    singlePokName: [],
    pokImg: [],
    pokList: [],
    pokRender: null,
    correctColor: false,
    colorSearch: false,
    pokColorNames: [],
    pokemon: [],
    loading: null,
    sort: false
  };

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
      this.setState({ pokemons: pokNames });
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
        this.setState({ pokColorNames: pokColorNames });
      })
      .catch(err => console.log(err));
  }

  onChangeHandler = event => {
    let typed = event.target.value;
    this.setState({
      inputVal: typed.toLowerCase().trim()
    });
  };

  // Fetching the images and names of pokemons by color
  pokemonHandler = () => {
    this.state.pokemonColor.forEach(pok => {
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
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  buttonClickedHandler = () => {
    const pokNames = this.state.pokemons;
    let searchVal = this.state.inputVal;
    const colorNames = this.state.pokColorNames;

    if (searchVal === "") {
      return;
    }

    // Checking if pokemon names array contains the input value
    let isThereName = pokNames.indexOf(searchVal);

    if (isThereName !== -1) {
      this.setState({
        pokRender: true,
        pokemonColor: [],
        colorSearch: false,
        pokemon: []
      });
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

          this.setState({
            pokWeight: response.data.weight,
            pokHeight: response.data.height,
            pokAbilities: abilitiesArr,
            singlePokName: response.data.name,
            pokList: this.state.pokList.concat(response.data.name),
            pokImg: response.data.sprites.front_shiny
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ pokRender: false });
    }

    // Checking if pokemon colors array contain the input value
    let isThereColor = colorNames.indexOf(searchVal);

    if (isThereColor !== -1) {
      this.setState({ colorSearch: true, correctColor: true });

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
          this.setState({ pokemonColor: pokColor });
          this.pokemonHandler();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ correctColor: false });
      return;
    }
    this.setState({ pokemon: [], sort: false });
  };

  sortButtonHandler = () => {
    this.setState({ sort: true });
  };

  render() {
    return (
      <Aux>
        <InputAndButton
          onChangeHandler={this.onChangeHandler}
          buttonClickedHandler={this.buttonClickedHandler}
        />
        <Dinamic
          colorSearch={this.state.colorSearch}
          pokemonColor={this.state.pokemonColor}
          pokemon={this.state.pokemon}
          pokRender={this.state.pokRender}
          correctColor={this.state.correctColor}
          pokImg={this.state.pokImg}
          pokName={this.state.singlePokName}
          height={this.state.pokHeight}
          weight={this.state.pokWeight}
          abilities={this.state.pokAbilities}
          pokList={this.state.pokList.sort()}
          sortButtonHandler={this.sortButtonHandler}
          sortVal={this.state.sort}
        />
      </Aux>
    );
  }
}

export default App;
