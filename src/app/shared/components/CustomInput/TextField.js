import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from '@material-ui/core/FormHelperText';
// import './TextField.scss';
import { Spin } from "antd";

const TextField = ({ ...props }) => {
  const {
    input,
    formControlProps,
    label,
    name,
    autoFocus,
    type,
    labelProps,
    inputProps,
    load,
    meta: { error, touched},
  } = props;
  const errorInput= (error && touched);
  const marginTop = classNames({
    "marginTop": label === undefined
  });

  return (
    <FormControl
      {...formControlProps}
      className="formControl"
      error={errorInput}
    >
      {label !== undefined ? (
        <InputLabel
          htmlFor={name}
          {...labelProps}
        >
          {label}
        </InputLabel>
      ) : null}
      <Input
        {...input}
        classes={{
          root: marginTop,
        }}
        id={name}
        type={type}
        autoFocus={autoFocus}
        endAdornment={load ? <Spin size="small"></Spin>: null}
        {...inputProps}
      />
      { errorInput && <FormHelperText id={name}>{error}</FormHelperText>}
    </FormControl>
  );
}


export default TextField;
