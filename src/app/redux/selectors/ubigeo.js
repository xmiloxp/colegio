import { createSelector } from 'reselect';

// export const getDepartments = createSelector(
//   (state) => state.ubigeo.departments.map(item => ({value: item.cod_dep, label: item.name}))
//   , departments => departments
// );

// export const getProvinces = createSelector(
// (state) => state.ubigeo.provinces.map(item => ({value: item.cod_pro, label: item.name}))
// , provinces => provinces
// );
// export const getDistricts = createSelector(
// (state, ) => state.ubigeo.districts.map(item => ({value: item.cod_dis, label: item.name}))
// , districts => districts
// );
export const getDepartments = createSelector(
    (state) => state.ubigeo.data.filter(value => (value.codPro === '00')).map(item => ({value: item.codDep, label: item.name}))
    , departments => departments
);

export const getProvinces = createSelector(
  (state) => state.ubigeo.data.filter(value => (value.codDep === state.ubigeo.codDep && value.codPro !== '00' && value.codDis === '00')).map(item => ({value: item.codPro, label: item.name}))
  , provinces => provinces
);
export const getDistricts = createSelector(
  (state, ) => state.ubigeo.data.filter(value => (value.codDep === state.ubigeo.codDep && value.codPro === state.ubigeo.codPro && value.codDis !== '00')).map(item => ({value: item.codDis, label: item.name}))
  , districts => districts
);
