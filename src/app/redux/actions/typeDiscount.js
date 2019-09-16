import { createAction } from 'redux-actions';
import { FETCH_TYPEDISCOUNTS, INSERT_TYPEDISCOUNT, UPDATE_TYPEDISCOUNT, DELETE_TYPEDISCOUNT } from "./types";
import { apiGet, apiDelete, apiPost, apiPut } from "../../api";

export const fetchTypediscounts = createAction(FETCH_TYPEDISCOUNTS, apiGet('/promotiontypes'));

export const insertTypediscount = createAction(INSERT_TYPEDISCOUNT , (values) => apiPost('/promotiontypes', values)());

export const updateTypediscount = createAction(UPDATE_TYPEDISCOUNT, (identifier, values) => apiPut(`/promotiontypes`, identifier, values)());

export const deleteTypediscount = createAction(DELETE_TYPEDISCOUNT, (identifier) => apiDelete(`/promotiontypes`, identifier)());
