import { createSelector } from 'reselect';

// export const getSeat = state => state.seat.only;
export const getClassrooms = state => state.classroom.data;

export const getClassrommById = createSelector(
  (state, id) => state.classroom.data.find( s => `${s.identifier}` === id), classroom => classroom);