import { createSelector } from 'reselect';

export const getTypediscounts = state => state.typediscount.data;
export const getTypediscountById = createSelector(
  (state, id) => state.typediscount.data.find( s => `${s.identifier}` === id), typediscount => typediscount);