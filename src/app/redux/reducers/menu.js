import { handleActions } from 'redux-actions';
import { FETCH_MENU_DATA } from '../actions/types';

export const menu = handleActions({
    [FETCH_MENU_DATA]: (state, action) => ({...action.payload}),
}, {});