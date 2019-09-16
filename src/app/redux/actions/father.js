import { createAction } from 'redux-actions';
import { FETCH_FATHER, INSERT_FATHER } from './types';
import { apiGet } from '../../api';
import { insertBusinessSubject } from './service';

export const fetchFathers = createAction(FETCH_FATHER, apiGet(`/fathers`));
export const insertFather = createAction(INSERT_FATHER , (values) => insertBusinessSubject(values));

