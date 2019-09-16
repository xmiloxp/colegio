import { createSelector } from 'reselect';

export const getDiscounts = state => state.discount.data;
export const getDiscountById = createSelector(
  (state, id) => state.discount.data.find( s => `${s.identifier}` === id), discount => discount);