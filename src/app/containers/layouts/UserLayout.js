import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import GlobalFooter from '../../shared/components/GlobalFooter';
// import './UserLayout.scss';
import image from '../../../static/images/login-register.jpg';
import cookie from 'react-cookies';

import { CardBody } from 'reactstrap';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 Web-Out S.A.
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    if(cookie.load('token')){
      this.props.history.push('/');
    } 
  }

  render() {
    const { children } = this.props;
    return (
        <div className="login-register login-sidebar" style={{backgroundImage: `url(${image})`}}>
          <div className="login-box">
            <CardBody>
              {children}
              <GlobalFooter copyright={copyright} />
            </CardBody>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  //isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, null)(UserLayout);
