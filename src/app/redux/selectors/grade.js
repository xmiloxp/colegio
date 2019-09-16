import { createSelector } from 'reselect';

export const getGrades = state => state.grade.data;

export const getGradeById = createSelector(
  (state, id) => state.grade.data.find( s => `${s.identifier}` === id), grade => grade);