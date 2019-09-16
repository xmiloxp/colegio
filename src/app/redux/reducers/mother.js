import { handleActions } from 'redux-actions';
import { FETCH_MOTHER, INSERT_MOTHER } from '../actions/types';

export const mother = handleActions({
    [FETCH_MOTHER]: (state, action) => ({...action.payload }),
    [INSERT_MOTHER]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),

}, {});