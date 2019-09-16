import { handleActions } from 'redux-actions';
import { LOGIN, FETCH_USER } from '../actions/types';

export const auth = handleActions({
    //[LOGIN_PENDING]: (state) => ({...state,isFetching: true, isAuthenticated: false}),
    [LOGIN]: (state, action) => {
        //console.log(action);
        //service.defaults.headers.common['Authorization'] = `Bearer ${action.payload.access_token}`;

        return {...state,isFetching: false, isAuthenticated: true};
    },
    [FETCH_USER]: (state, action) => {
        //console.log(action);
        //cookie.save('user', action.payload.data);
        return {...state,user: action.payload.data};
    },
    //[LOGIN_REJECTED]: (state, action) => ({...state,isFetching: true, isAuthenticated: false, errorMessage: action.payload}),
}, {});