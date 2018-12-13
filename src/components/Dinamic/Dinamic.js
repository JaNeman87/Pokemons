import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  sortButton,
  singlePokInfo,
  ifThereIsNoName,
  ifThereIsAName
} from "../../store/actions";
import classes from "./Dinamic.css";
import PokemonInfo from "../PokemonInfo/PokemonInfo";
import Spinner from "../Spinner/Spinner";

class Dinamic extends Component {
  sortButtonHandler = () => {
    this.props.sortButton();
  };

  onPokemonClick(event) {
    console.log(event.target.textContent);
    const pokemon = event.target.textContent;
    if (pokemon !== "") {
      this.props.ifThereIsAName();
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
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
  }
  render() {
    let pokemon = null;
    let foundPokemons = null;
    let pokemonsByColor = null;
    let findOutMore = null;
    let recSearches = null;

    if (this.props.loading !== true) {
      // Checking if sort button is pressed
      if (this.props.sort) {
        let sorted = this.props.newPokemon.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        pokemonsByColor = sorted.map(pok => {
          return (
            <div className={classes.FoundPokemons} key={Math.random() * 100}>
              <div className={classes.pokNameImg}>
                <img src={pok.img} alt="" height="130px" width="130px" />
                <p
                  onClick={event => this.onPokemonClick(event)}
                  className={classes.pokByColText}
                >
                  {pok.name}
                </p>
              </div>
            </div>
          );
        });
      } else {
        pokemonsByColor = this.props.newPokemon.map(pok => {
          return (
            <div className={classes.FoundPokemons} key={Math.random() * 100}>
              <div className={classes.pokNameImg}>
                <img src={pok.img} alt="" height="130px" />
                <p
                  onClick={event => this.onPokemonClick(event)}
                  className={classes.pokByColText}
                >
                  {pok.name}
                </p>
              </div>
            </div>
          );
        });
      }
    } else {
      pokemonsByColor = <Spinner />;
    }

    if (this.props.pokRender === false && !this.props.correctColor) {
      pokemonsByColor = null;
    }

    if (this.props.pokRender || this.props.newPokemon.length !== 0) {
      foundPokemons = this.props.pokList.map(pok => {
        return (
          <div className={classes.FoundPokemons} key={Math.random() * 100}>
            <div>
              <h5>{pok}</h5>
            </div>
          </div>
        );
      });
    }

    if (
      (this.props.pokRender === false && !this.props.correctColor) ||
      this.props.loading
    ) {
      foundPokemons = null;
    }
    if (this.props.pokRender) {
      pokemon = (
        <PokemonInfo
          pokImg={this.props.pokImg}
          pokName={this.props.singlePokName}
          height={this.props.pokHeight}
          weight={this.props.pokWeight}
          abilities={this.props.pokAbilities}
        />
      );
    }

    if (this.props.pokRender === false && !this.props.correctColor) {
      pokemon = (
        <div className={classes.warning}>
          <div className={classes.NoPokemon}>
            <p className={classes.NoPokemonTxt}>
              Sorry... No pokemon with that name or color :(
            </p>
          </div>
        </div>
      );
    }

    if (this.props.colorSearch && this.props.loading === false) {
      findOutMore = (
        <div className={classes.findOutandSort}>
          <p className={classes.foundText}>
            Click on the pokemon name to find out more!!!
          </p>
          <button
            className={classes.sortButton}
            onClick={this.sortButtonHandler}
          >
            Sort pokemons alphabetically
          </button>
        </div>
      );
    }
    if (
      this.props.pokRender === false &&
      !this.props.correctColor &&
      this.props.colorSearch &&
      this.props.loading !== true
    ) {
      findOutMore = null;
    }
    if (this.props.pokList.length > 0) {
      recSearches = <h2 className={classes.recSearches}>Recent Searches</h2>;
    }
    if (
      this.props.loading ||
      (this.props.pokRender === false && !this.props.correctColor) ||
      (this.props.newPokemon.length === 0 && !this.props.pokRender)
    ) {
      recSearches = null;
    }

    return (
      <div>
        <div style={{ textAlign: "center" }}> {pokemon}</div>
        <div style={{ textAlign: "center" }}> {findOutMore}</div>
        <div style={{ textAlign: "center" }}> {pokemonsByColor}</div>
        <div style={{ textAlign: "center" }}> {recSearches}</div>
        <div style={{ textAlign: "center" }}> {foundPokemons}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokWeight: state.pokWeight,
    pokHeight: state.pokHeight,
    pokAbilities: state.pokAbilities,
    singlePokName: state.singlePokName,
    pokImg: state.pokImg,
    pokList: state.pokList,
    newPokemon: state.newPokemon,
    pokRender: state.pokRender,
    pokemonColor: state.pokemonColor,
    colorSearch: state.colorSearch,
    correctColor: state.correctColor,
    sort: state.sort,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sortButton: () => dispatch(sortButton()),
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
    ifThereIsAName: () => dispatch(ifThereIsAName()),
    ifThereIsNoName: () => dispatch(ifThereIsNoName())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dinamic);
