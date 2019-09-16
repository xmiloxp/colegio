import { handleActions } from 'redux-actions';
import { CHANGE_LAYOUT_COLLAPSED } from '../actions/types';

export const global = handleActions({
    [CHANGE_LAYOUT_COLLAPSED]: (state, action) => ({...state, collapsed: action.payload}),
}, {});
