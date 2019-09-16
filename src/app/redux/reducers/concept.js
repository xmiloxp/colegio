import { handleActions } from 'redux-actions';
import { FETCH_CONCEPTS_ENROLLMENT } from '../actions/types';

export const conceptEnrollment = handleActions({
    [FETCH_CONCEPTS_ENROLLMENT]: (state, action) => ({...action.payload}),
}, {});