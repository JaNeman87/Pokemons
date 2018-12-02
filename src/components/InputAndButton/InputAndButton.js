import React from "react";
import classes from "./InputAndButton.css";

const inputAndButton = props => {
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
        onChange={props.onChangeHandler}
      />
      <button className={classes.Button} onClick={props.buttonClickedHandler}>
        Find
      </button>
    </div>
  );
};

export default inputAndButton;
