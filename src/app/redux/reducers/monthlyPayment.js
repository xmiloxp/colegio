import { handleActions } from 'redux-actions';
import { FETCH_MONTHLYPAYMENT } from '../actions/types';
//import { FETCH_MONTHLYPAYMENT } from '../actions/types';

export const monthlyPayment = handleActions({
    [FETCH_MONTHLYPAYMENT]: (state, action) => ({...action.payload}),
}, {});