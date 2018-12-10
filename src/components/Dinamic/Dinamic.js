import React, { Component } from "react";
import { connect } from "react-redux";
import { sortButton } from "../../store/actions";
import classes from "./Dinamic.css";
import PokemonInfo from "../PokemonInfo/PokemonInfo";

class Dinamic extends Component {
  sortButtonHandler = () => {
    this.props.sortButton();
  };
  render() {
    let pokemon = null;
    let foundPokemons = null;
    let pokemonsByColor = null;

    if (this.props.pokemonColor !== "") {
      // Checking if sort button is pressed
      if (this.props.sort) {
        let sorted = this.props.newPokemon.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
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
        pokemonsByColor = this.props.newPokemon.map(pok => {
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

    foundPokemons = this.props.pokList.map(pok => {
      return (
        <div className={classes.FoundPokemons} key={Math.random() * 100}>
          <div>
            <h5>{pok}</h5>
          </div>
        </div>
      );
    });

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
          {this.props.colorSearch ? (
            <div>
              <h2 className={classes.foundText}>
                Type some of these names into the search bar to find out more!!!
              </h2>
              <button
                className={classes.sortButton}
                onClick={this.sortButtonHandler}
              >
                Sort pokemons alphabetically
              </button>
            </div>
          ) : null}
        </div>
        <div style={{ textAlign: "center" }}> {pokemonsByColor}</div>
        <div style={{ textAlign: "center" }}>
          {" "}
          {this.props.pokList.length > 0 ? (
            <h2 style={{ color: "white" }}>Recent Searches</h2>
          ) : null}
        </div>
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
    sort: state.sort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sortButton: () => dispatch(sortButton())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dinamic);
