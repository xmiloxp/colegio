import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

const GridItem = ({ ...props }) => {
  const { classes, children, className, ...rest } = props;
  const gridClasses = classNames({[className]: className});
  return (
    <Grid item {...rest} className={`${classes.grid} ${gridClasses}`}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
