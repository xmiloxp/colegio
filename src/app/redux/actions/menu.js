import { createAction } from 'redux-actions';
import { FETCH_MENU_DATA } from './types';
import { getMenuData } from '../../utils/menu';

export const fetchMenuData = createAction(FETCH_MENU_DATA,
     (routes)=> getMenuData(routes));