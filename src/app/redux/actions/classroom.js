import { createAction } from 'redux-actions';
import { FETCH_CLASSROOMS, FETCH_CLASSROOM, INSERT_CLASSROOM, DELETE_CLASSROOM, UPDATE_CLASSROOM } from "./types";
import { apiGet, apiPost, apiPut, apiDelete } from "../../api";

export const fetchClassrooms = createAction(FETCH_CLASSROOMS, apiGet('/classrooms'));

export const fetchClassroom = createAction(FETCH_CLASSROOM, (value) => apiGet(`/classrooms/${value}`)());

export const insertClassroom = createAction(INSERT_CLASSROOM , (values) => apiPost('/classrooms', values)());

export const updateClassroom = createAction(UPDATE_CLASSROOM, (identifier, values) => apiPut(`/classrooms`, identifier, values)());

export const deleteClassroom = createAction(DELETE_CLASSROOM, (identifier) => apiDelete(`/classrooms`, identifier)());