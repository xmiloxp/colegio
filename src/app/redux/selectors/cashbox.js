import { createSelector } from 'reselect';

export const getCashboxes = state => state.cashbox.data;

export const getCashBoxById = createSelector(
  (state, id) => state.cashbox.data.find( s => `${s.identifier}` === id), cashbox => cashbox);