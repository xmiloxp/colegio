import { handleActions } from 'redux-actions';
import { FETCH_DEPARTMENTS, FETCH_PROVINCES, FETCH_DISTRICTS, FETCH_UBIGEO, SET_COD_DEP, SET_COD_PRO } from '../actions/types';

export const ubigeo = handleActions({
    [FETCH_UBIGEO]: (state, action) => ({...state, data: action.payload.data}), 
    [SET_COD_DEP]: (state, action) => ({...state, codDep: action.payload}),
    [SET_COD_PRO]: (state, action) => ({...state, codPro: action.payload}),

    [FETCH_DEPARTMENTS]: (state, action) => ({...state, departments: action.payload}),
    [FETCH_PROVINCES]: (state, action) => ({...state, provinces: action.payload}),
    [FETCH_DISTRICTS]: (state, action) => ({...state, districts: action.payload}),
    // [FETCH_DEPARTMENTS]: (state, action) => ({...state, codDep: action.payload}),
    // [FETCH_PROVINCES]: (state, action) => ({...state, codPro: action.payload}),
}, {});