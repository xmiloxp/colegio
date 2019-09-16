import Loadable from 'react-loadable';
import loading from '../../../shared/components/PageLoading';

export default [{
        path: "/user",
        component: Loadable({
            loader: () =>
                import ('../../layouts/UserLayout'),
            loading
        }),
        routes: [{
                path: "/user",
                redirect: "/user/login",
                exact: true
            },
            {
                path: "/user/login",
                exact: true,
                component: Loadable({
                    loader: () =>
                        import ('../../Account/LogIn'),
                    loading
                }),
            }
        ]
    },
    {
        path: '/',
        component: Loadable({
            loader: () =>
                import ('../../layouts/BasicLayout'),
            loading
        }),
        private: true,
        routes: [

            {
                path: '/',
                redirect: '/educational/enrollment',
                exact: true
            },
            {
                path: '/educational',
                name: 'Educativo',
                icon: 'solution',
                routes: [
                    {
                        path: "/educational/enrollment",
                        name: 'Matricula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Educational/Enrollment'),
                            loading
                        }),
                    },
                    {
                        path: "/educational/enrollment/new",
                        name: 'Matricula',
                        component: Loadable({
                            loader: () =>
                                import ('../../Educational/Enrollment/EnrollmentNew'),
                            loading
                        }),
                    }, 
                ]
            },
            {
                path: '/enrollment',
                name: 'Matrícula',
                icon: 'solution',
                routes: [
                    {
                        path: "/enrollment/levels",
                        name: 'Niveles',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Levels'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/levels/new",
                        name: 'Nuevo nivel',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Levels/New'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/levels/:identifier/edit",
                        name: 'Editar nivel',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Levels/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/grades",
                        name: 'Grados',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Grades'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/grades/new",
                        name: 'Nuevo grado',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Grades/New'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/grades/:identifier/edit",
                        name: 'Editar grado',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Grades/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/classrooms",
                        name: 'Aulas',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Classrooms'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/classrooms/new",
                        name: 'Registrar Aula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Classrooms/New'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/classrooms/:identifier/edit",
                        name: 'Actualizar Aula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Classrooms/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/prices",
                        name: 'Precio por aula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Prices'),
                            loading
                        }),
                    },
                    {
                        path: "/enrollment/prices/new",
                        name: 'Registrar precio',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Enrollment/Prices/New'),
                            loading
                        }),
                    },
                ]
            },
            {
                path: '/cashbox',
                name: 'Caja',
                icon: 'dollar',
                routes: [
                    {
                        path: "/cashbox/open",
                        name: 'Abrir caja',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Cashbox/Open'),
                            loading
                        }),
                    },
                    {
                        path: "/cashbox/close",
                        name: 'Abrir close',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Cashbox/Close'),
                            loading
                        }),
                    }
                ]
            },
            {
                path: '/income',
                name: 'Ingreso',
                icon: 'solution',
                routes: [
                    {
                        path: "/income/enrollment",
                        name: 'Matricula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Income/Enrollment'),
                            loading
                        }),
                    },
                    {
                        path: "/income/enrollment/new",
                        name: 'Matricula',
                        component: Loadable({
                            loader: () =>
                                import ('../../Income/Enrollment/New'),
                            loading
                        }),
                    }, 
                    {
                        path: "/income/monthlypayment",
                        name: 'Pensión',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Income/MonthlyPayment'),
                            loading
                        }),
                    },
                    {
                        path: "/income/monthlypayment/new",
                        name: 'Pensión',
                        component: Loadable({
                            loader: () =>
                                import ('../../Income/MonthlyPayment/New'),
                            loading
                        }),
                    },
                    {
                        path: "/income/general",
                        name: 'General',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Income/General'),
                            loading
                        }),
                    },
                    {
                        path: "/income/general/new",
                        name: 'General',
                        component: Loadable({
                            loader: () =>
                                import ('../../Income/General/New'),
                            loading
                        }),
                    }, 
                ]
            },

            {
                path: '/payout',
                name: 'Salida',
                icon: 'solution',
                routes: [
                    {
                        path: "/payout/salary",
                        name: 'Salario',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Payout/Salary'),
                            loading
                        }),
                    },
                    {
                        path: "/payout/salary/new",
                        name: 'Salario',
                        component: Loadable({
                            loader: () =>
                                import ('../../Payout/Salary/New'),
                            loading
                        }),
                    },
                    {
                        path: "/payout/general",
                        name: 'General',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Payout/General'),
                            loading
                        }),
                    },
                    {
                        path: "/payout/general/new",
                        name: 'General',
                        component: Loadable({
                            loader: () =>
                                import ('../../Payout/General/New'),
                            loading
                        }),
                    }, 
                ]
            },

            {
                path: '/rrhh',
                name: 'Recursos Humanos',
                icon: 'user',
                routes: [{
                        path: "/rrhh/fathers",
                        name: 'Padres',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Fathers'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/fathers/new",
                        name: 'Padres',
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Fathers/NewFather'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/mothers",
                        name: 'Madres',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Mothers'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/mothers/new",
                        name: 'Madres',
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Mothers/NewMother'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/parents",
                        name: 'Apoderados',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Parents'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/parents/new",
                        name: 'Apoderados',
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Parents/NewParent'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/students",
                        name: 'Alumnos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Students'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/students/new",
                        name: 'Alumnos',
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Students/NewStudent'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/employees",
                        name: 'Personal',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Employees'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/employees/new",
                        name: 'Personal',
                        component: Loadable({
                            loader: () =>
                                import ('../../RRHH/Employees/NewEmployee'),
                            loading
                        }),
                    },
                ]
            },
            {
                path: '/administration',
                name: 'Administración',
                icon: 'global',
                routes: [
                    // {
                    //     path: "/administration/cashbox",
                    //     name: 'Caja',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Cashbox'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/cashbox/new",
                    //     name: 'Registrar Caja',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Cashbox/New'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/cashbox/:identifier/edit",
                    //     name: 'Actualizar Caja',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Cashbox/Edit'),
                    //         loading
                    //     }),
                    // },
                    {
                        path: "/administration/academicyears",
                        name: 'Año escolar',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/AcademicYear'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/academicyears/new",
                        name: 'Registrar Año',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/AcademicYear/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/academicyears/:identifier/edit",
                        name: 'Actualizar Año',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/AcademicYear/Edit'),
                            loading
                        }),
                    },
                    // {
                    //     path: "/administration/classrooms",
                    //     name: 'Aulas',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Classrooms'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/classrooms/new",
                    //     name: 'Registrar Aula',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Classrooms/New'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/classrooms/:identifier/edit",
                    //     name: 'Actualizar Aula',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Classrooms/Edit'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/levels",
                    //     name: 'Niveles',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Levels'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/levels/new",
                    //     name: 'Registrar nivel',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Levels/New'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/levels/:identifier/edit",
                    //     name: 'Editar nivel',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Levels/Edit'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/grades",
                    //     name: 'Grados',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Grades'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/grades/new",
                    //     name: 'Registrar grado',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Grades/New'),
                    //         loading
                    //     }),
                    // },
                    // {
                    //     path: "/administration/grades/:identifier/edit",
                    //     name: 'Editar grado',
                    //     exact: true,
                    //     component: Loadable({
                    //         loader: () =>
                    //             import ('../../Administration/Grades/Edit'),
                    //         loading
                    //     }),
                    // },

                    {
                        path: "/administration/concepts",
                        name: 'Productos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Concepts'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/concepts/new",
                        name: 'Registro Concepto',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Concepts/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/concepts/:identifier/edit",
                        name: 'Actualizar Concepto',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Concepts/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/discounts",
                        name: 'Descuentos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Discounts'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/discounts/new",
                        name: 'Registrar descuento',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Discounts/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/discounts/:identifier/edit",
                        name: 'Actualizar descuento',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Discounts/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/typediscounts",
                        name: 'Tipos de descuentos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Discounts/Type'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/typediscounts/new",
                        name: 'Registrar descuento',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Discounts/Type/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/typediscounts/:identifier/edit",
                        name: 'Actualizar descuento',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Discounts/Type/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/users",
                        name: 'Usuarios',
                        exact: true,
                        component: Loadable({ 
                            loader: () => 
                                import('../../Administration/Users'), 
                            loading 
                        }),
                    },
                    {
                        path: "/administration/users/new",
                        name: 'Registro Usuario',
                        component: Loadable({
                            loader: () =>
                                import ('../../Administration/Users/New'),
                            loading
                        }),
                    },
                    // {
                    //   path: "/administration/rolesandpermissions",
                    //   name: 'Roles y permisos',
                    //   exact: true,
                    //   component: Loadable({ loader: () => import('./pages/Administration/RolesPermissions'), loading }),
                    // }
                ]
            },
            {
                path: '/configuration',
                name: 'Configuración',
                icon: 'setting',
                routes: [{
                        path: "/configuration/company",
                        name: 'Empresa',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Configuration/Company'),
                            loading
                        }),
                    },
                    {
                        path: "/configuration/seats",
                        name: 'Sedes',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('../../Configuration/Seats'),
                            loading
                        }),
                    },
                    {
                        path: "/configuration/seats/new",
                        name: 'Registro Sede',
                        component: Loadable({
                            loader: () =>
                                import ('../../Configuration/Seats/SeatNew'),
                            loading
                        }),
                    },
                    {
                        path: "/configuration/seats/:identifier/edit",
                        name: 'Actualizando Sede',
                        component: Loadable({
                            loader: () =>
                                import ('../../Configuration/Seats/SeatEdit'),
                            loading
                        }),
                    },
                ]
            },
        ]
    }

];