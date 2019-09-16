import { createAction } from 'redux-actions';
import { FETCH_USERS } from './types';
import { apiGet, apiPost } from '../../api';

export const fetchUsers = createAction(FETCH_USERS, apiGet(`/users`));
export const insertUser =  values => apiPost('/auth/user', values)();