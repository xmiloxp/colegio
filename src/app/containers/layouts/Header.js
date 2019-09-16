import React, { Component } from 'react';
import { Layout} from 'antd';
import Animate from 'rc-animate';
import { connect } from 'react-redux';
import GlobalHeader from '../../shared/components/GlobalHeader';
// import './Header.scss';

const { Header } = Layout;

class HeaderView extends Component {
  componentDidMount() {
  }

  getHeadWidth = () => {
    const { isMobile, collapsed } = this.props;
    if (isMobile) {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleMenuClick = ({ key }) => {

  };

  render() {
    const { handleMenuCollapse } = this.props;
    const width = this.getHeadWidth();
    const HeaderDom = (
      <Header style={{ padding: 0, width }} className='fixedHeader'>
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            {...this.props}
          />
      </Header>
    );
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(null,null)(HeaderView);
