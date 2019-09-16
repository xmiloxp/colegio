import {FECTH_ENROLLMENTS, INSERT_ENROLLMENT } from "../actions/types";
import { handleActions} from 'redux-actions';

export const enrollment = handleActions({
  [FECTH_ENROLLMENTS]: (state, action) => ({...action.payload}),
  [INSERT_ENROLLMENT]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
}, {});