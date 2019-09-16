import cookie from 'react-cookies';

export const initialState = {
    auth: {
        isFetching: false,
        isAuthenticated: !!cookie.load('token') ? true : false,
        user: {}
    },
    menu: {
        menuData : [],
        breadcrumbNameMap: []
    },
    global: {
        collapsed: true,
    },
    seat: { data: [] },
    concept: { data:[] },
    conceptEnrollment: { data:[] },
    level: { data:[] },
    grade: { data:[] },
    classroom: { data:[] },
    academicyear : { data: [], only: {} },
    typediscount : { data: [] },
    discount : { data: [] },
    father : { data: [] },
    mother : { data: [] },
    parent: { data: [] },
    student: { data: [] },
    employee: { data: [] },
    enrollment: { data: [] },
    cashbox: { data: [] },
    ubigeo:{
        data:[],
        codDep: '00',
        codPro: '00'
    },
    complement:{
        fathers: [],
        mothers: [],
        parents: [],
        seats: [],
        grades: [],
        levels: [],
        classrooms: [],
        vouchertypes: [],
        paymodes: [],
        roles: [],
        employees: [],
        typediscounts: [],
        discounts: [],
        students: [],
    },
    user: {
        data:[]
    }
}