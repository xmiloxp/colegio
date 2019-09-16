import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
// import './index.scss';
import RightContent from './RightContent';

export default class GlobalHeader extends Component {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    console.log(!collapsed);
    onCollapse(!collapsed);
    // this.triggerResizeEvent();
  };
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className="header">
        {isMobile && (
          <Link to="/" className="logo" key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <RightContent {...this.props} />
      </div>
    );
  }
}
