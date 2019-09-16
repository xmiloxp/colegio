import { createSelector } from 'reselect';

// export const getSeat = state => state.seat.only;
export const getLevels = state => state.level.data;

export const getLevelById = createSelector(
  (state, id) => state.level.data.find( s => `${s.identifier}` === id), level => level);