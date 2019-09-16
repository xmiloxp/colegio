import { handleActions } from 'redux-actions';
import { FETCH_CONCEPTS, INSERT_CONCEPT, UPDATE_CONCEPT, DELETE_CONCEPT } from '../actions/types';

export const concept = handleActions({
    [FETCH_CONCEPTS]: (state, action) => ({...action.payload}),
    [INSERT_CONCEPT]: (state, action) => ({ ...state, data: [ ...state.data, action.payload.data]}),
    [UPDATE_CONCEPT]: (state, action) => {
        const conceptPayload = action.payload.data;
        const { identifier } = conceptPayload;
        const concepts = state.data;
    
        const newConcepts = concepts.reduce( (reducer, concept) => {
          if (concept.identifier === identifier) {
            return [ ...reducer, conceptPayload ];
          } else {
            return [ ...reducer, concept ];
          }
        }, []);
        return {...state, data: newConcepts};
    },
    [DELETE_CONCEPT]: (state, action) => {
        const conceptPayload = action.payload.data;
        const { identifier } = conceptPayload;
        const concepts = state.data;
        const newConcepts = concepts.filter(c=>c.identifier !== identifier);
        return {...state, data: newConcepts};
    },
}, {});