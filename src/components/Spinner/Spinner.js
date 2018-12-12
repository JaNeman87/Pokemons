import React from "react";
import classes from "./Spinner.css";

const spinner = () => {
  return (
    <div>
      <div className={classes.loader}>Loading...</div>;
      <h1 className={classes.spinnerText}>Please wait...</h1>
    </div>
  );
};

export default spinner;
