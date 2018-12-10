import * as actionTypes from "./actions";

const initialState = {
  inputVal: "",
  pokemons: [],
  pokColorNames: [],
  pokWeight: [],
  pokHeight: [],
  pokAbilities: [],
  singlePokName: [],
  pokList: [],
  pokImg: [],
  pokemonColor: [],
  pokRender: null,
  newPokemon: [],
  colorSearch: false,
  correctColor: false,
  sort: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TYPED_VALUE:
      return {
        ...state,
        inputVal: action.value.toLowerCase().trim()
      };
    case actionTypes.FETCHING_POK_NAMES:
      return {
        ...state,
        pokemons: action.names
      };
    case actionTypes.FETCHING_POK_COLORS:
      return {
        ...state,
        pokColorNames: action.colors
      };
    case actionTypes.SINGLE_POK_INFO:
      return {
        ...state,
        pokWeight: action.pokWeight,
        pokHeight: action.pokHeight,
        pokAbilities: action.pokAbilities,
        singlePokName: action.singlePokName,
        pokList: state.pokList.concat(action.singlePokName).sort(),
        pokImg: action.pokImg
      };
    case actionTypes.POK_COLOR:
      return {
        ...state,
        pokemonColor: action.color
      };
    case actionTypes.NEW_POKEMON:
      return {
        ...state,
        newPokemon: action.pokemon
      };
    case actionTypes.IF_THERE_IS_A_NAME:
      return {
        ...state,
        pokRender: true,
        pokemonColor: [],
        newPokemon: [],
        colorSearch: false
      };

    case actionTypes.IF_THERE_IS_NO_NAME:
      return {
        ...state,
        pokRender: false
      };
    case actionTypes.IF_THERE_IS_A_COLOR:
      return {
        ...state,
        colorSearch: true,
        correctColor: true
      };
    case actionTypes.IF_THERE_IS_NO_COLOR:
      return {
        ...state,
        correctColor: false
      };
    case actionTypes.SORT:
      return {
        ...state,
        sort: true
      };
    case actionTypes.UNSORT:
      return {
        ...state,
        sort: false,
        newPokemon: []
      };
    default:
      break;
  }
  return state;
};

export default reducer;
