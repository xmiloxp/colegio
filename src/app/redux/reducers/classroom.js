import { FETCH_CLASSROOMS, INSERT_CLASSROOM, UPDATE_CLASSROOM, DELETE_CLASSROOM } from "../actions/types";
import { handleActions} from 'redux-actions';

export const classroom = handleActions({
  [FETCH_CLASSROOMS]: (state, action) => ({...action.payload}),
  [INSERT_CLASSROOM]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
  [UPDATE_CLASSROOM]: (state, action) => {
    const classroomPayload = action.payload.data;
    const { identifier } = classroomPayload;
    const classrooms = state.data;

    const newClassrooms = classrooms.reduce( (reducer, classroom) => {
      if (classroom.identifier === identifier) {
        return [ ...reducer, classroomPayload ];
      } else {
        return [ ...reducer, classroom ];
      }
    }, []);
    return {...state, data: newClassrooms};
  },
  [DELETE_CLASSROOM]: (state, action) => {
    const classroomPayload = action.payload.data;
    const { identifier } = classroomPayload;
    const classrooms = state.data;
    const newClassrooms = classrooms.filter(c=>c.identifier !== identifier);
    return {...state, data: newClassrooms};
  },
}, {});