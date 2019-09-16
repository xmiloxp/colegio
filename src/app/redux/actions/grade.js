import { createAction } from 'redux-actions';
import { FETCH_GRADES, FETCH_GRADE, INSERT_GRADE, UPDATE_GRADE, DELETE_GRADE } from "./types";
import { apiGet, apiPost, apiPut, apiDelete } from "../../api";

export const fetchGrades = createAction(FETCH_GRADES, apiGet('/grades'));

export const fetchGrade = createAction(FETCH_GRADE, (value) => apiGet(`grades/${value}`)());

export const insertGrade = createAction(INSERT_GRADE , (values) => apiPost('/grades', values)());

export const updateGrade = createAction(UPDATE_GRADE, (identifier, values) => apiPut(`/grades`, identifier, values)());

export const deleteGrade = createAction(DELETE_GRADE, (identifier) => apiDelete(`/grades`, identifier)());