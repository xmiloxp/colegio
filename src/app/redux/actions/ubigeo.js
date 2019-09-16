import { createAction } from 'redux-actions';
import { FETCH_UBIGEO, SET_COD_DEP, SET_COD_PRO } from './types';
import { apiGet } from '../../api';

export const fetchUbigeo = createAction(FETCH_UBIGEO, apiGet(`/ubigeos`));
export const setCodDep = createAction(SET_COD_DEP, value =>value);
export const setCodPro = createAction(SET_COD_PRO, value =>value);
