import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
//import Button from "@material-ui/core/Button";
// import './Button.scss';

const RegularButton = ({ ...props }) => {
  const {
    color,
    type,
    fullWidth,
    round,
    children,
    disabled,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;
  const btnClasses = classNames({
    "button": true,
    "fullWidth": fullWidth,
    [size]: size,
    [color]: color,
    "round": round,
    "disabled": disabled,
    "block": block,
    "link": link,
    "justIcon": justIcon,
    className: className
  });
  return (
    <button {...rest} type={type} className={btnClasses}>
      {children}
    </button>
  );
}

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object
};

export default RegularButton;
