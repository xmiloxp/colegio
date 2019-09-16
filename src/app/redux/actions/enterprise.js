import { createAction } from 'redux-actions';
import { FECTH_ENTERPRISE, INSERT_ENTERPRISE, UPDATE_ENTERPRISE } from './types';
import { apiGet, apiPost, apiPut } from '../../api';
import { formatDate } from '../../utils/utils';

export const fetchEnterprise = createAction(FECTH_ENTERPRISE, apiGet('/enterprise'));
export const insertEnterprise = createAction( INSERT_ENTERPRISE, values => {
  if(values.birthday){
      values.birthday = formatDate(values.birthday);
  }
  return apiPost('/enterprise', values)();
})

export const updateEnterprise = createAction(UPDATE_ENTERPRISE, values => {
  if(values.birthday){
      values.birthday = formatDate(values.birthday);
  }
  return apiPut(`/enterprise`,values.identifier, values)();
})