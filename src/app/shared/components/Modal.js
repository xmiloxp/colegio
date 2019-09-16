import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Modal } from 'reactstrap';
import classNames from 'classnames';
import CloseIcon from 'mdi-react/CloseIcon';
import CloseCircleOutlineIcon from 'mdi-react/CloseCircleOutlineIcon';
import FlagVariantOutlineIcon from 'mdi-react/FlagVariantOutlineIcon';
import ThumbUpOutlineIcon from 'mdi-react/ThumbUpOutlineIcon';
import PinOutlineIcon from 'mdi-react/PinOutlineIcon';


class ModalComponent extends Component {

  render(){
    const {show, color, message, title, colored, header, onCancel, onClose, onOutsideClick, onConfirm, showCancelButton} = this.props;
    let Icon;
    switch (color) {
      case 'primary':
        Icon = <PinOutlineIcon className="modal__title-icon" />;
        break;
      case 'success':
        Icon = <ThumbUpOutlineIcon className="modal__title-icon" />;
        break;
      case 'warning':
        Icon = <FlagVariantOutlineIcon className="modal__title-icon" />;
        break;
      case 'danger':
        Icon = <CloseCircleOutlineIcon className="modal__title-icon" />;
        break;
      default:
        break;
    }
    const modalClass = classNames({
      'modal-dialog--colored': colored,
      'modal-dialog--header': header,
    });

    return (
      <Fragment>
        <Modal
          isOpen={show}
          toggle={onOutsideClick}
          className={`modal-dialog--${color} ${modalClass}`}
        >
          <div className="modal__header">
            <CloseIcon className="modal__close-btn" size={14} onClick={onClose}/>
            {header ? '' : Icon}
            <h4 className="bold-text  modal__title">{title}</h4>
          </div>
          <div className="modal__body">
            {message}
          </div>
          <ButtonToolbar className="modal__footer">
            <Button outline={colored} color={color} onClick={onConfirm}>Confirmar</Button>
            { showCancelButton && <Button onClick={onCancel}>Cancelar</Button>}{' '}
          </ButtonToolbar>
        </Modal>
      </Fragment>
    );
  }

};

ModalComponent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  color: PropTypes.string.isRequired,
  colored: PropTypes.bool,
  header: PropTypes.bool,
  showCancelButton: PropTypes.bool,

  // custom option
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  onOutsideClick: PropTypes.func,
}

ModalComponent.defaultProps = {
  title: '',
  message: '',
  colored: false,
  header: false,
  showCancelButton: false,

  // custom option
  show: false
}
export default ModalComponent;