import { createSelector } from 'reselect';

export const getSeat = state => state.seat.only;
export const getSeats = state => state.seat.data;

export const getSeatById = createSelector(
  (state, id) => state.seat.data.find( s => `${s.identifier}` === id), seat => seat);