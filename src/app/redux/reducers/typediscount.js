import { FETCH_TYPEDISCOUNTS, INSERT_TYPEDISCOUNT, UPDATE_TYPEDISCOUNT, DELETE_TYPEDISCOUNT } from "../actions/types";
import { handleActions} from 'redux-actions';

export const typediscount = handleActions({
  [FETCH_TYPEDISCOUNTS]: (state, action) => ({...action.payload}),
  [INSERT_TYPEDISCOUNT]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
  [UPDATE_TYPEDISCOUNT]: (state, action) => {
    const payload = action.payload.data;
    const { identifier } = payload;
    const data = state.data;

    const newData = data.reduce( (reducer, item) => {
      if (item.identifier === identifier) {
        return [ ...reducer, payload ];
      } else {
        return [ ...reducer, item ];
      }
    }, []);
    return {...state, newData};
  },
  [DELETE_TYPEDISCOUNT]: (state, action) => {
    const payload = action.payload.data;
    const { identifier } = payload;
    const data = state.data;
    const newData = data.filter(c=>c.identifier !== identifier);
    return {...state, data: newData};
  },
}, {});