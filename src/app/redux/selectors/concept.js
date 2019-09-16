import { createSelector } from 'reselect';

export const getConcepts = state => state.concept.data;

export const getConceptById = createSelector(
  (state, id) => state.concept.data.find( s => `${s.identifier}` === id), academicyear => academicyear);