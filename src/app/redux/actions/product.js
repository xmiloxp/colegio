import { createAction } from 'redux-actions';
import { FETCH_CONCEPTS, FETCH_CONCEPT, INSERT_CONCEPT, UPDATE_CONCEPT, DELETE_CONCEPT } from './types';
import { apiGet, apiPost, apiDelete, apiPut } from '../../api';

export const fetchConcepts = createAction(FETCH_CONCEPTS, apiGet('/concepts'));

// export const fetchConcept = createAction(FETCH_CONCEPT, (value) => apiGet(`/concepts/${value}`)());

export const insertConcept = createAction(INSERT_CONCEPT,values => apiPost('/concepts', values)());

export const updateConcept = createAction(UPDATE_CONCEPT,(identifier, values) => apiPut(`/concepts`, identifier, values)());

export const deleteConcept = createAction(DELETE_CONCEPT,(identifier, values) => apiDelete(`/seats`, identifier)());