export const TYPED_VALUE = "TYPED_VALUE";
export const FETCHING_POK_NAMES = "FETCHING_POK_NAMES";
export const FETCHING_POK_COLORS = "FETCHING_POK_COLORS";
export const SINGLE_POK_INFO = "SINGLE_POK_INFO";
export const POK_COLOR = "POK_COLOR";
export const NEW_POKEMON = "NEW_POKEMON";
export const IF_THERE_IS_A_NAME = "IF_THERE_IS_A_NAME";
export const IF_THERE_IS_NO_NAME = "IF_THERE_IS_NO_NAME";
export const IF_THERE_IS_A_COLOR = "IF_THERE_IS_A_COLOR";
export const IF_THERE_IS_NO_COLOR = "IF_THERE_IS_NO_COLOR";
export const SORT = "SORT";
export const UNSORT = "UNSORT";
export const LOADING_OR_NO = "LOADING_OR_NO";
export const NO_POKEMON = "NO_POKEMON";

export const typedValue = value => {
  return {
    type: TYPED_VALUE,
    value: value
  };
};

export const fetchingPokNames = names => {
  return {
    type: FETCHING_POK_NAMES,
    names: names
  };
};
export const fetchingPokColors = colors => {
  return {
    type: FETCHING_POK_COLORS,
    colors: colors
  };
};

export const singlePokInfo = (
  pokWeight,
  pokHeight,
  pokAbilities,
  singlePokName,
  pokList,
  pokImg
) => {
  return {
    type: SINGLE_POK_INFO,
    pokWeight: pokWeight,
    pokHeight: pokHeight,
    pokAbilities: pokAbilities,
    singlePokName: singlePokName,
    pokList: pokList,
    pokImg: pokImg
  };
};
export const pokColor = color => {
  return {
    type: POK_COLOR,
    color: color
  };
};

export const newPokemon = pokemon => {
  return {
    type: NEW_POKEMON,
    pokemon: pokemon
  };
};

export const ifThereIsAName = () => {
  return {
    type: IF_THERE_IS_A_NAME
  };
};

export const ifThereIsNoName = () => {
  return {
    type: IF_THERE_IS_NO_NAME
  };
};

export const ifThereIsAColor = () => {
  return {
    type: IF_THERE_IS_A_COLOR
  };
};

export const ifThereIsNoColor = () => {
  return {
    type: IF_THERE_IS_NO_COLOR
  };
};

export const sortButton = () => {
  return {
    type: SORT
  };
};

export const unsort = () => {
  return {
    type: UNSORT
  };
};

export const loadingOrNo = val => {
  return {
    type: LOADING_OR_NO,
    val: val
  };
};

export const noPokemon = () => {
  return {
    type: NO_POKEMON
  };
};
