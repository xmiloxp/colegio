import { handleActions } from 'redux-actions';
import { FETCH_EMPLOYEES, INSERT_EMPLOYEE } from '../actions/types';

export const employee = handleActions({
    [FETCH_EMPLOYEES]: (state, action) => ({...action.payload}),
    [INSERT_EMPLOYEE]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
}, {});