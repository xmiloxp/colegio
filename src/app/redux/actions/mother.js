import { createAction } from 'redux-actions';
import { FETCH_MOTHER, INSERT_MOTHER } from './types';
import { apiGet } from '../../api';
import { insertBusinessSubject } from './service';

export const fetchMothers = createAction(FETCH_MOTHER, apiGet(`/mothers`));
export const insertMother = createAction(INSERT_MOTHER, (values) => insertBusinessSubject(values));