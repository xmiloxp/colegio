import React from 'react';
import { BasicNotification } from "../shared/components/Notification";
import moment from 'moment';

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatDate(d) {

  d =  new Date(d);
  return d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
}

export function convertStringToDate(d) {
  var date = d.split('/'),
   dateNow = moment().format('DD/MM/YYYY').split('/'),
   day = date[0] ? date[0].padStart(2,'0') : dateNow[0],
   month = date[1] ? date[1].padStart(2,'0'): dateNow[1],
   year = date[2] && date[2].length === 4 ? date[2] : dateNow[2];

  var string =  `${year}-${month}-${day}`; 
  return new Date(string);
}

export const normalizeDocument = (max = null) => value => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if(max === null){
    return onlyNums;
  }
  if(max && onlyNums.length <= max){
    return onlyNums;
  }
}

export const normalizeNumber = value => {
  if (!value) {
    return value
  }
  return value.replace(/[^\d]/g, '')
}
export const maxLength = max => value => {
  return value && value.length > max ? `Debe tener ${max} caracteres o menos` : undefined
}

export const minLength = min => value => {
  return value && value.length < min ? `Debe tener ${min} caracteres o más` : undefined
}


export const Length = length => value => {
  return value && value.length < length ? `Debe tener ${length} caracteres` : undefined
}

export const normalizePhone = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3,6)}-${onlyNums.slice(6,9)}`;
}
export const normalizeDecimal = value => {
  value = value
  .replace(/[^0-9.]/g, '')
  const sections = value.split('.')

  if (sections[0] !== '0' && sections[0] !== '00') {
      sections[0] = sections[0].replace(/^0+/, '')
  } else {
      sections[0] = '0'
  }

  if (sections[1]) {
      return sections[0] + '.' + sections[1].slice(0, 2)
  } else if (value.indexOf('.') !== -1) {
      return sections[0] + '.'
  } else {
      return sections[0]
  }
}

export const transformDataDni = value => {
  if(!value){
    return value;
  }
  return {
    dni: value.dni,
    firstName: value.nombres,
    lastName: value.apellido_paterno + ' ' +value.apellido_materno,
  };
}

export const transformDataRuc = value => {
  if(!value){
    return value;
  }
  return {
    ruc: value.ruc,
    businessName: value.razon_social,
    tradeName: value.nombre_comercial,
    address: value.domicilio_fiscal,
  };
}
export const normalizeCheckboxValues = (value, previousValue) => {
  // only the onChange event returns a string
  if (typeof value !== 'string') return previousValue
  if (!previousValue || !previousValue.length) return [value]
  if (!previousValue.find(val => val === value))
    return [...previousValue, value]
  return previousValue.filter(val => val !== value)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const toUpper = value => value && value.toUpperCase();
export const toLower = value => value && value.toLowerCase();


export const showNotification = ({ notification, content, position }) => {
  switch (position) {
    case 'left-up':
      notification.notice({
        content: content,
        duration: 5,
        closable: true,
        style: { top: 0, left: 240 },
        className: position,
      });
      break;
    case 'right-up':
      notification.notice({
        content: content,
        duration: 5,
        closable: true,
        style: { top: 0, left: 'calc(100vw - 100%)' },
        className: position,
      });
      break;
    default:
      notification.notice({
        content: content,
        duration: 5,
        closable: true,
        style: { top: 0, left: 0 },
        className: position,
      });
      break;
  }
};

export const notificationSuccess = notification => {
  showNotification({
    notification: notification,
    content: <BasicNotification 
    title="Correcto"
    message="Los datos se guardaron con éxito."
    icon
    color="success"
    />,
    position: 'right-up'
  });
}

export const notificationError = (notification, message) => {
  showNotification({
    notification: notification,
    content: <BasicNotification 
    title="Error"
    message={message}
    icon
    color="danger"
    />,
    position: 'right-up'
  });
}