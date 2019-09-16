import { createAction } from 'redux-actions';
import { apiGet, apiPost, apiDelete, apiPut } from '../../api';
import { FETCH_CONCEPTS_ENROLLMENT } from './types';

export const insertConceptEnrollment = values => {
  return apiPost('/concepts/saveConceptEnrollment', values)();
}

export const fetchConceptsEnrollment = createAction(FETCH_CONCEPTS_ENROLLMENT, apiGet('/getConceptsEnrollment'));
