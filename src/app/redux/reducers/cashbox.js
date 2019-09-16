import { FETCH_CASHBOXES, INSERT_CASHBOX, UPDATE_CASHBOX } from "../actions/types";
import { handleActions} from 'redux-actions';

export const cashbox = handleActions({
  [FETCH_CASHBOXES]: (state, action) => ({...action.payload}),
  [INSERT_CASHBOX]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
  [UPDATE_CASHBOX]: (state, action) => {
    const gradePayload = action.payload.data;
    const { identifier } = gradePayload;
    const grades = state.data;

    const newGrades = grades.reduce( (reducer, grade) => {
      if (grade.identifier === identifier) {
        return [ ...reducer, gradePayload ];
      } else {
        return [ ...reducer, grade ];
      }
    }, []);
    return {...state, data: newGrades};
  },
}, {});