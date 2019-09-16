import { createAction } from 'redux-actions';
import { FETCH_MONTHLYPAYMENT } from './types';

export const fetchMonthlyPayments = createAction(FETCH_MONTHLYPAYMENT, params => params);