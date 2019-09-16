import { createAction } from 'redux-actions';
import { 
  FETCH_ACADEMICYEARS, 
  INSERT_ACADEMICYEAR,
  UPDATE_ACADEMICYEAR,
  DELETE_ACADEMICYEAR,
  CHANGE_STATE_ACADEMICYEAR,
  FETCH_ACADEMICYEAR,
  
} from './types';

import { apiPost, apiGet, apiPut, apiDelete } from '../../api';

export const fetchAcademicYears = createAction(FETCH_ACADEMICYEARS, apiGet('/academicyears'));

export const changeStateAcademicYear = createAction(CHANGE_STATE_ACADEMICYEAR, (identifier) => apiPut(`academicyears/changestate`, identifier)());

export const insertAcademicYear = createAction(INSERT_ACADEMICYEAR , (values) => apiPost('/academicyears', values)());

export const updateAcademicYear = createAction(UPDATE_ACADEMICYEAR, (identifier, values) => apiPut(`/academicyears`, identifier, values)());

export const deleteAcademicYear = createAction(DELETE_ACADEMICYEAR, (identifier) => apiDelete(`/academicyears`, identifier)());

export const fetchAcademicYear = createAction(FETCH_ACADEMICYEAR, apiGet(`/util/academicyear`));