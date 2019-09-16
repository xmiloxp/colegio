import { createAction } from 'redux-actions';
import { LOAD_FATHERS, LOAD_MOTHERS, LOAD_PARENTS, 
  LOAD_SEATS, LOAD_LEVELS, LOAD_GRADES, LOAD_CLASSROOMS,
  LOAD_VOUCHERTYPES, LOAD_PAYMODES, LOAD_ROLES,
  LOAD_EMPLOYEES, LOAD_DISCOUNT,
  LOAD_TYPEDISCOUNT,
  LOAD_STUDENTS} from './types';
import { apiGet } from '../../api';

export const loadFathers = createAction(LOAD_FATHERS, apiGet('util/fathers'));
export const loadMothers = createAction(LOAD_MOTHERS, apiGet('util/mothers'));
export const loadParents = createAction(LOAD_PARENTS, apiGet('util/parents'));
export const loadSeats = createAction(LOAD_SEATS, apiGet('util/seats'));
export const loadVoucherTypes = createAction(LOAD_VOUCHERTYPES, apiGet('util/vouchertypes'));
export const loadPayModes = createAction(LOAD_PAYMODES, apiGet('util/paymodes'));
export const loadLevels = createAction(LOAD_LEVELS, apiGet('util/levels'));
export const loadGrades = createAction(LOAD_GRADES, apiGet('util/grades'));
export const loadClassrooms = createAction(LOAD_CLASSROOMS, apiGet('util/classrooms'));
export const loadRoles = createAction(LOAD_ROLES, apiGet('util/roles'));
export const loadEmployees = createAction(LOAD_EMPLOYEES, apiGet('util/employees'));
export const loadTypediscount = createAction(LOAD_TYPEDISCOUNT, apiGet('util/typediscounts'));
export const loadDiscount = createAction(LOAD_DISCOUNT, apiGet('util/discounts'));
export const loadStudents = createAction(LOAD_STUDENTS, apiGet('util/students'));


