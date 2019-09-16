import { createAction } from 'redux-actions';
import { FETCH_LEVELS, FETCH_LEVEL, INSERT_LEVEL, UPDATE_LEVEL, DELETE_LEVEL } from "./types";
import { apiGet, apiDelete, apiPost, apiPut } from "../../api";

export const fetchLevels = createAction(FETCH_LEVELS, apiGet('/levels'));

export const fetchLevel = createAction(FETCH_LEVEL, (value) => apiGet(`levels/${value}`)());

export const insertLevel = createAction(INSERT_LEVEL , (values) => apiPost('/levels', values)());

export const updateLevel = createAction(UPDATE_LEVEL, (identifier, values) => apiPut(`/levels`, identifier, values)());

export const deleteLevel = createAction(DELETE_LEVEL, (identifier) => apiDelete(`/levels`, identifier)());
