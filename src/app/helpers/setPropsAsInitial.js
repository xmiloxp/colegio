import React, { Component } from 'react';

export const setPropsAsInitial = WrappedComponet => (
  class extends Component {
    render() {
      return <WrappedComponet {...this.props} 
        initialValues={this.props.data}
        enableReinitialize />
    }
  }
);
