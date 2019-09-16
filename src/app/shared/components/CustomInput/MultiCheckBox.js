import React from "react";

import { Checkbox, FormControlLabel, FormControl, FormLabel, FormGroup } from "@material-ui/core";

const MultiCheckBox = ({input, options, text}) => {
  const {name} = input;
  return (
          <FormControl component="fieldset" >
            <FormLabel component="legend">{text}</FormLabel>
            <FormGroup>
            {options.map(({value, label}, i) => {
              return (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      name={`${name}[${i}]`}
                      value={label}
                      checked={input.value.indexOf(value) !== -1}
                      onChange={(event) => {
                        const newValue = [...input.value];
                        if (event.target.checked) {
                          newValue.push(value);
                        } else {
                          newValue.splice(newValue.indexOf(value), 1);
                        }
                        return input.onChange(newValue);
                      }}
                    color="primary"
                  />
                }
              label={label}
            />
            );
              
          })}
          </FormGroup>
        </FormControl>
      );
};

export default MultiCheckBox;
