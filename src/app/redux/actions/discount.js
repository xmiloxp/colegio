import { createAction } from 'redux-actions';
import { FETCH_DISCOUNTS, INSERT_DISCOUNT, UPDATE_DISCOUNT, DELETE_DISCOUNT } from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../api';

export const fetchDiscounts = createAction(FETCH_DISCOUNTS, apiGet('/promotions'));

export const insertDiscount = createAction(INSERT_DISCOUNT , (values) => apiPost('/promotions', values)());

export const updateDiscount = createAction(UPDATE_DISCOUNT, (identifier, values) => apiPut(`/promotions`, identifier, values)());

export const deleteDiscount = createAction(DELETE_DISCOUNT, (identifier) => apiDelete(`/promotions`, identifier)());