import React ,{Component} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/core/AccountCircle';

class Loading extends Component 
{
  render(){
    return (
      <InputAdornment position="end">
          <AccountCircle />
      </InputAdornment>
    );
  }
}

export default Loading;