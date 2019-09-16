import { handleActions } from 'redux-actions';
import { FETCH_PARENTS, INSERT_PARENT } from '../actions/types';

export const parent = handleActions({
    [FETCH_PARENTS]: (state, action) => ({...action.payload}),
    [INSERT_PARENT]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
}, {});