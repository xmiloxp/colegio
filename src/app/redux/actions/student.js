import { createAction } from 'redux-actions';
import { FETCH_STUDENTS, INSERT_STUDENT } from './types';
import { apiGet, apiPost } from '../../api';
import { formatDate } from '../../utils/utils';

export const fetchStudents = createAction(FETCH_STUDENTS, apiGet(`/students`));
export const insertStudent = createAction(INSERT_STUDENT, values => {
  if(values.birthday){
      values.birthday = formatDate(values.birthday);
  }
  return apiPost('/students', values)();
});