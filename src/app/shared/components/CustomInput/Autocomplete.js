import React from 'react';
import classNames from "classnames";
import Select from 'react-select';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from './Style/Autocomplete';

const NoOptionsMessage = (props) => {
    return (
        <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
        >
        {/* {props.children} */}
        No hay resultados
        </Typography>
    );
}
  
const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
}
  
const Control = (props) => {
    return (
        <FormControl
            {...props.selectProps.formControlProps}
            className={props.selectProps.classes.formControl}
            error={props.selectProps.error}
        >
            <TextField
            error={props.selectProps.error}
            InputProps={{
                inputComponent,
                inputProps: {
                className: props.selectProps.classes.input,
                inputRef: props.innerRef,
                children: props.children,
                ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
            />
        </FormControl>
    );
}
  
const Option = (props) => {
    return (
        <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
        >
        {props.children}
        </MenuItem>
    );
}
  
const Placeholder = (props) => {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
}
  
const SingleValue = (props) => {
    return (
      <Typography 
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}>
        {props.children}
      </Typography>
    );
}
  
const ValueContainer = (props) => {
    return <div 
        className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
  
const MultiValue = (props) => {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused,
          })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
const Menu = (props) => {
    return (
      <Paper square 
        className={props.selectProps.classes.paper}
        {...props.innerProps}>
        {props.children}
      </Paper>
    );
}
  
const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};



const Autocomplete = ({...props}) => {
    const { 
        classes,
        input,
        formControlProps,
        suggestions,
        label,
        name,
        isMulti,
        meta: { error, touched},
    } = props;

    const selectProps = isMulti ? {isMulti:isMulti}:{isClearable:true};
    const errorInput = (error && touched);
    return (
        <Select 
            value={input.value}
            classes={classes}
            error={errorInput}
            options={suggestions}
            components={components}
            onChange={input.onChange}
            onBlur={()=>input.onBlur(input.value)}
            formControlProps={formControlProps}
            textFieldProps={{
                label: label,
                id: name,
                helperText: errorInput?error:'',
                InputLabelProps: {
                  shrink: true,
                },
              }}
              placeholder="Seleccionar"
              {...selectProps}
        />
    );
};
export default withStyles(styles)(Autocomplete);