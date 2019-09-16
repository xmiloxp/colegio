import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';

const DatePickerField = ({...props}) => {

    const { 
      formControlProps,
      label,
      name,
      input,
     } = props;
     input.value = input.value !== "" ? input.value:null;
    return (
        <FormControl {...formControlProps} className="formControl">
        <div className="picker">
            <DatePicker
                id={name}
                keyboard
                label={label}
                format="dd/MM/YYYY"
                placeholder="dd/mm/yyyy"
                mask={value =>
                value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]:[]}
                value={input.value}
                autoOk
                onChange={input.onChange}
                disableOpenOnEnter
                cancelLabel="Cancelar"
                animateYearScrolling={true}
            />
        </div>
        </FormControl>
    );
}


export default DatePickerField;