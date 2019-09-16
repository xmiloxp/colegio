import { createAction } from 'redux-actions';
import { FECTH_ENROLLMENTS, INSERT_ENROLLMENT} from "./types";
import { apiGet, apiPost } from "../../api";

export const fetchEnrollments = createAction(FECTH_ENROLLMENTS, apiGet('/enrollments'));

export const insertEnrollment = createAction(INSERT_ENROLLMENT , (values) => apiPost('/enrollments', values)());
