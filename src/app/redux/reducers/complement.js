import { handleActions } from 'redux-actions';
import { LOAD_MOTHERS, LOAD_FATHERS, LOAD_PARENTS, LOAD_SEATS, 
    LOAD_GRADES, LOAD_LEVELS, LOAD_CLASSROOMS, LOAD_PAYMODES, 
    LOAD_VOUCHERTYPES, LOAD_ROLES, LOAD_EMPLOYEES, LOAD_TYPEDISCOUNT, LOAD_DISCOUNT, LOAD_STUDENTS } from '../actions/types';

export const complement = handleActions({
    [LOAD_MOTHERS]: (state, action) => ({...state, mothers: action.payload }),
    [LOAD_FATHERS]: (state, action) => ({...state, fathers: action.payload }),
    [LOAD_PARENTS]: (state, action) => ({...state, parents: action.payload }),
    [LOAD_SEATS]: (state, action) => ({...state, seats: action.payload }),
    [LOAD_LEVELS]: (state, action) => ({...state, levels: action.payload }),
    [LOAD_GRADES]: (state, action) => ({...state, grades: action.payload }),
    [LOAD_CLASSROOMS]: (state, action) => ({...state, classrooms: action.payload }),
    [LOAD_PAYMODES]: (state, action) => ({...state, paymodes: action.payload }),
    [LOAD_VOUCHERTYPES]: (state, action) => ({...state, vouchertypes: action.payload }),
    [LOAD_ROLES]: (state, action) => ({...state, roles: action.payload }),
    [LOAD_EMPLOYEES]: (state, action) => ({...state, employees: action.payload }),
    [LOAD_TYPEDISCOUNT]: (state, action) => ({...state, typediscounts: action.payload }),
    [LOAD_DISCOUNT]: (state, action) => ({...state, discounts: action.payload }),
    [LOAD_STUDENTS]: (state, action) => ({...state, students: action.payload }),
    // [LOAD_CLASSROOMS_ENROLLMENT]: (state, action) => ({...state, classrooms_enrollment: action.payload }),
}, {});