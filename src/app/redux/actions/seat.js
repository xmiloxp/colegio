import { createAction } from 'redux-actions';
import { FETCH_SEATS, INSERT_SEAT, UPDATE_SEAT, DELETE_SEAT } from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../api';

export const fetchSeats = createAction(FETCH_SEATS, apiGet('/seats'));

export const insertSeat = createAction(INSERT_SEAT, values => apiPost('/seats', values)());

export const updateSeat = createAction(UPDATE_SEAT, (identifier, values) => apiPut(`/seats`, identifier, values)());

export const setMainSeat = createAction(UPDATE_SEAT,(identifier) => apiPut(`/seats/main`, identifier)());

export const deleteSeat = createAction(DELETE_SEAT, (identifier) => apiDelete(`/seats`, identifier)());