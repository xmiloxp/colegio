import { FETCH_LEVELS, INSERT_LEVEL, UPDATE_LEVEL, DELETE_LEVEL } from "../actions/types";
import { handleActions} from 'redux-actions';

export const level = handleActions({
  [FETCH_LEVELS]: (state, action) => ({...action.payload}),
  [INSERT_LEVEL]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
  [UPDATE_LEVEL]: (state, action) => {
    const levelPayload = action.payload.data;
    const { identifier } = levelPayload;
    const levels = state.data;

    const newLevels = levels.reduce( (reducer, level) => {
      if (level.identifier === identifier) {
        return [ ...reducer, levelPayload ];
      } else {
        return [ ...reducer, level ];
      }
    }, []);
    return {...state, data: newLevels};
  },
  [DELETE_LEVEL]: (state, action) => {
    const levelPayload = action.payload.data;
    const { identifier } = levelPayload;
    const levels = state.data;
    const newLevels = levels.filter(c=>c.identifier !== identifier);
    return {...state, data: newLevels};
  },
}, {});