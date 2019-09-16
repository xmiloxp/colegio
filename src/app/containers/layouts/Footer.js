import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '../../shared/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 Web-Out S.A.
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
