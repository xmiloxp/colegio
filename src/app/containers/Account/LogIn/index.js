import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import logo from '../../../../static/images/logo-icon.png'
import LoginForm from './components/LogInForm';
import { login } from '../../../redux/actions/auth';
import cookie from 'react-cookies';
import { CardTitle } from 'reactstrap' ;

import NotificationSystem from 'rc-notification';
import { BasicNotification } from '../../../shared/components/Notification';
import { showNotification } from '../../../utils/utils';
// import SweetAlert from 'sweetalert-react';

let notification;
class LogIn extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }
  
  handleSubmit = values =>{
    return this.props.login(values).then(r=>{
      cookie.save('token', r.payload.access_token);
      this.props.history.push("/");
    }).catch( r => {
      if(r.error === 'invalid_credentials'){
        r.message = 'La contraseña no es valida';
      }
      showNotification({
        notification: notification,
        content: <BasicNotification 
          icon
          message={r.message}
          color="danger"
        />,
        position: 'right-up'
      })
      // this.setState({show:true});
    });
  }

  render() {
    return (
      <Fragment>
        <CardTitle className="desc">
            <span><img alt="logo" className="" src={logo} /> Total Soft</span>
            <div >Lo hacemos facil</div>
        </CardTitle>
        <LoginForm onSubmit={this.handleSubmit} />
        {/* <SweetAlert
          show={this.state.show}
          title="Error"
          type="error"
          html
          text={"Usuario o password invalidos."}
          onConfirm={() => {
            this.setState({show:false})
            }}
        ></SweetAlert> */}
      </Fragment>
    );
  }
}

export default connect(null,{
  login
})(LogIn);