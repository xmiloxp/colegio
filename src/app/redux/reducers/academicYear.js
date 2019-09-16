import { handleActions } from 'redux-actions';
import { 
    FETCH_ACADEMICYEARS, 
    INSERT_ACADEMICYEAR,
    UPDATE_ACADEMICYEAR,
    DELETE_ACADEMICYEAR,
    CHANGE_STATE_ACADEMICYEAR,
    FETCH_ACADEMICYEAR
} from '../actions/types';
import { STATE_ACTIVO, STATE_CERRADO } from '../../Constants';

export const academicyear = handleActions({
    [FETCH_ACADEMICYEARS]: (state, action) => ({...action.payload}),
    [FETCH_ACADEMICYEAR]: (state, action) => ({...state, only: {...action.payload}}),
    [INSERT_ACADEMICYEAR]: (state, action) => ({ ...state, data: [ ...state.data, action.payload.data ] }),
    [UPDATE_ACADEMICYEAR]: (state, action) => {
        const academicyearPayload = action.payload.data;
        const { identifier } = academicyearPayload;
        const academicyears = state.data;
    
        const newAcademicyears = academicyears.reduce( (reducer, academicyear) => {
          if (academicyear.identifier === identifier) {
            return [ ...reducer, academicyearPayload ];
          } else {
            return [ ...reducer, academicyear ];
          }
        }, []);
        return {...state, data: newAcademicyears};
    },
    [CHANGE_STATE_ACADEMICYEAR]: (state, action) => {
      const academicyearPayload = action.payload.data;
      const { identifier } = academicyearPayload;
      const academicyears = state.data;
  
      const newAcademicyears = academicyears.reduce( (reducer, academicyear) => {
        if (academicyear.identifier === identifier) {
          return [ ...reducer, academicyearPayload ];
        } else {
          if(academicyearPayload.state === STATE_ACTIVO && academicyear.state === STATE_ACTIVO) {
            return [ ...reducer, {...academicyear, state: STATE_CERRADO} ];
          } else {
            return [ ...reducer, academicyear ];
          }
        }
      }, []);
      return {...state, data: newAcademicyears};
  },
    [DELETE_ACADEMICYEAR]: (state, action) => {
        const academicyearPayload = action.payload.data;
        const { identifier } = academicyearPayload;
        const academicyears = state.data;
        const newAcademicyears = academicyears.filter(c=>c.identifier !== identifier);
        return {...state, data: newAcademicyears};
    },
}, {});