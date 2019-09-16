import { handleActions } from 'redux-actions';
import { FETCH_USERS } from '../actions/types';

export const user = handleActions({
    [FETCH_USERS]: (state, action) => ({...action.payload}),
}, {});