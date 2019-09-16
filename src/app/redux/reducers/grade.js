import { FETCH_GRADES, INSERT_GRADE, DELETE_GRADE, UPDATE_GRADE } from "../actions/types";
import { handleActions} from 'redux-actions';

export const grade = handleActions({
  [FETCH_GRADES]: (state, action) => ({...action.payload}),
  [INSERT_GRADE]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
  [UPDATE_GRADE]: (state, action) => {
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
  [DELETE_GRADE]: (state, action) => {
    const gradePayload = action.payload.data;
    const { identifier } = gradePayload;
    const grades = state.data;
    const newGrades = grades.filter(c=>c.identifier !== identifier);
    return {...state, data: newGrades};
  },
}, {});