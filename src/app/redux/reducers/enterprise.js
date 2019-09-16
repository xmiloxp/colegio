import { handleActions } from 'redux-actions';
import { FECTH_ENTERPRISE, INSERT_ENTERPRISE, UPDATE_ENTERPRISE } from '../actions/types';

export const enterprise = handleActions({
    [FECTH_ENTERPRISE]: (state, action) => ({...action.payload.data }),
    [INSERT_ENTERPRISE]: (state, action) => ({...action.payload.data }),
    [UPDATE_ENTERPRISE]: (state, action) => ({...action.payload.data }),
}, {});