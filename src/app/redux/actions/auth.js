import { createAction } from 'redux-actions';
import { LOGIN, FETCH_USER } from './types';
import { apiPost, apiGet } from '../../api';
import { USER_LOGIN_OBJECT } from '../../api/constant';

export const login = createAction(LOGIN, 
    ({username, password }) => {
        USER_LOGIN_OBJECT.username = username;
        USER_LOGIN_OBJECT.password = password;
        return apiPost(`/oauth/token`, USER_LOGIN_OBJECT)();
    } );
export const fetchUser = createAction(FETCH_USER, apiGet('/currentUser'));