import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const renderOptions = (options) => {
  return options.map(option =>{
    return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>

  })
}
const SelectField = ({...props}) => {

    const { 
      formControlProps,
      name,
      label,
      input,
      suggestions,
      meta: {error,touched},
      handleChange
     } = props;

     const errorInput= (error && touched);

    return (
        <FormControl {...formControlProps} className="formControl" error={errorInput}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            name={name}
            input={<Input id={name} {...input}/>}
          >
            {renderOptions(suggestions)}
          </Select>
          {errorInput && <FormHelperText id={name}>{error}</FormHelperText>}
        </FormControl>
    );
}

export default SelectField;