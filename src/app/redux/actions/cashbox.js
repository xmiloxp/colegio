import { createAction } from 'redux-actions';
import { FETCH_CASHBOXES, INSERT_CASHBOX, UPDATE_CASHBOX } from "./types";
import { apiGet, apiPost, apiPut } from "../../api";

export const fetchCashboxes = createAction(FETCH_CASHBOXES, apiGet('/checkboxes'));

export const insertCashbox = createAction(INSERT_CASHBOX , (values) => apiPost('/checkboxes', values)());

export const updateCashbox = createAction(UPDATE_CASHBOX, (identifier, values) => apiPut(`/checkboxes`, identifier, values)());