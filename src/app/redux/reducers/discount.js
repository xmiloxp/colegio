import { FETCH_DISCOUNTS, INSERT_DISCOUNT, UPDATE_DISCOUNT, DELETE_DISCOUNT } from "../actions/types";
import { handleActions} from 'redux-actions';

export const discount = handleActions({
    [FETCH_DISCOUNTS]: (state, action) => ({...action.payload}),
    [INSERT_DISCOUNT]: (state, action) => ({...state, data: [...state.data, action.payload.data]}),
    [UPDATE_DISCOUNT]: (state, action) => {
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
    [DELETE_DISCOUNT]: (state, action) => {
      const payload = action.payload.data;
      const { identifier } = payload;
      const data = state.data;
      const newData = data.filter(c=>c.identifier !== identifier);
      return {...state, data: newData};
    },
  }, {});