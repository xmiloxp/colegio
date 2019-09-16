import React, { Component } from 'react';
import { Spin, Menu, Icon, Dropdown, Avatar } from 'antd';
import cookie from 'react-cookies';

// import './index.scss';

export default class GlobalHeaderRight extends Component {

  logout= () => {
    // console.log(this.props);
    cookie.remove('token')
    this.props.history.push('/');
    window.location.reload();
  }
  render() {
    const {
      onMenuClick,
      user
    } = this.props;
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout" onClick={this.logout}>
          <Icon type="logout" />
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    );

    return (
      <div className='right'>
          <Dropdown overlay={menu}>
            <span className='action account'>
              <Avatar
                size="small"
                className="avatar"
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                alt="avatar"
              />
              <span className="name">{user.name}</span>
            </span>
          </Dropdown>

      </div>
    );
  }
}
