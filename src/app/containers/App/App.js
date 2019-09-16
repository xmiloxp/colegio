import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import cookie from 'react-cookies';

// pikers
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

// routes
import routes from './routes/router';
import renderRoutes from './routes/renderRoutes';

//const isAuthenticated = cookie.load('token') ? true : false


// Store Configuration
import configureStore from './store/configureStore';
import { initialState } from '../../redux/reducers/initialState';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../scss/Main.scss';
import 'sweetalert/dist/sweetalert.css';
import 'antd/dist/antd.css'

const store = configureStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            { renderRoutes(routes) }
          </Router>
        </MuiPickersUtilsProvider>
      </Provider>
    );
  }
}

export default App;
