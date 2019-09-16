import { handleActions } from 'redux-actions';
import { FETCH_STUDENTS, INSERT_STUDENT } from '../actions/types';

export const student = handleActions({
    [FETCH_STUDENTS]: (state, action) => ({...action.payload}),
    [INSERT_STUDENT]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
}, {});