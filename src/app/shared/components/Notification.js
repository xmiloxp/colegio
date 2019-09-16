/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon';
import ThumbUpOutlineIcon from 'mdi-react/ThumbUpOutlineIcon';
import CommentAlertOutlineIcon from 'mdi-react/CommentAlertOutlineIcon';
import CloseCircleOutlineIcon from 'mdi-react/CloseCircleOutlineIcon';

export class BasicNotification extends Component {
  static propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    icon: PropTypes.bool,
  };

  static defaultProps = {
    color: '',
    title: '',
    icon: false,
  };

  render() {
    const { color, title, message, icon } = this.props;
    let Icon;

    switch (color) {
      case 'info':
        Icon = <InformationOutlineIcon />;
        break;
      case 'success':
        Icon = <ThumbUpOutlineIcon />;
        break;
      case 'warning':
        Icon = <CommentAlertOutlineIcon />;
        break;
      case 'danger':
        Icon = <CloseCircleOutlineIcon />;
        break;
      default:
        break;
    }

    return (
      <div className={`notification notification--${color}`}>
        {icon && <div className="notification__icon">{Icon}</div>}
        <div className="notification__content">
          {title &&<h5 className="notification__title bold-text">{title}</h5>}
          <p className="notification__message">{message}</p>
        </div>
      </div>
    );
  }
}

export class ImageNotification extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const { img, title, message } = this.props;

    return (
      <div className="notification notification--image">
        <div className="notification__image">
          <img src={img} alt="" />
        </div>
        <h5 className="notification__title bold-text">{title}</h5>
        <p className="notification__message">{message}</p>
      </div>
    );
  }
}

export class FullWideNotification extends Component {
  static propTypes = {
    color: PropTypes.string,
    message: PropTypes.string.isRequired,
  };

  static defaultProps = {
    color: '',
  };

  render() {
    const { color, message } = this.props;

    return (
      <div className={`notification notification--full-wide notification--${color}`}>
        <p className="notification__message">{message}</p>
      </div>
    );
  }
}
