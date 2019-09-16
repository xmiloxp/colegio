import { createAction } from 'redux-actions';
import { FETCH_PARENTS, INSERT_PARENT } from './types';
import { apiGet } from '../../api';
import { insertBusinessSubject } from './service';

export const fetchParents = createAction(FETCH_PARENTS, apiGet(`/parents`));
export const insertParent = createAction(INSERT_PARENT , (values) => insertBusinessSubject(values));
