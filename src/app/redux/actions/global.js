import { createAction } from 'redux-actions';
import { CHANGE_LAYOUT_COLLAPSED, SET_PAGINATION } from './types';

export const changeLayoutCollapsed = createAction(CHANGE_LAYOUT_COLLAPSED, value => value);
export const setPagination = createAction(SET_PAGINATION, params => params);
