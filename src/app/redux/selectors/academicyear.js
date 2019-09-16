import { createSelector } from 'reselect';

export const getAcademicyears = state => state.academicyear.data;

export const getAcademicyear = state => state.academicyear.only;

export const getAcademiyearById = createSelector(
  (state, id) => state.academicyear.data.find( s => `${s.identifier}` === id), academicyear => academicyear);