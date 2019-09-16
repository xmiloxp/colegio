import React from "react";

import { Checkbox, FormControlLabel } from "@material-ui/core";

const CheckBox = ({ ...props }) => {
  const {
    input,
    formControlProps,
    label,
  } = props;

  return (
    <FormControlLabel
      {...formControlProps}
      className="formControl"
      control={
        <Checkbox
          id={input.name}
          checked={input.value ? true: false}
          onChange={ input.onChange }
          color="primary"
        />
      }
      label={label}
    />
  );
}


export default CheckBox;
