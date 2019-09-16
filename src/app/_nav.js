export default [
  {
    name: 'Educativo',
    path: '/educational',
    icon: 'solution',
    children: [
      {
        name: 'Matricula',
        path:'/educational/enrollment',
        exact: true
      }
    ]
  },
  {
    name: 'Matrícula',
    path: '/enrollment',
    icon: 'solution',
    children: [
      {
        name: 'Niveles',
        path: '/enrollment/levels',
        exact: true
      },
      {
        name: 'Grados',
        path: '/enrollment/grades',
        exact: true
      },
      {
        name: 'Aulas',
        path: '/enrollment/classrooms',
        exact: true
      },
      {
        name: 'Precios',
        path: '/enrollment/prices',
        exact: true
      },
    ]
  },
  {
    name: 'Caja',
    path: '/cashbox',
    icon: 'dollar',
    children: [
      {
        name: 'Abrir caja',
        path:'/cashbox/open',
        exact: true
      },
      {
        name: 'Cerrar caja',
        path:'/cashbox/close',
        exact: true
      },
      // {
      //   name: 'Ingresos',
      //   path: '/cashbox',
      //   children: [
      //     {
      //       name: 'Matricula',
      //       path: '/cashbox/charge',
      //       exact: true,
      //     },
      //     {
      //       name: 'Pensión',
      //       path: '/cashbox/monthlypaymnet',
      //       exact: true
      //     },
      //     {
      //       name: 'Cobros',
      //       path: '/cashbox/income',
      //       exact: true
      //     }
      //   ]
      // },
      // {
      //   name: 'Salidas',
      //   path: '/cashbox',
      //   children: [
      //     {
      //       name: 'Pagos',
      //       path: '/cashbox/payout',
      //       exact: true
      //     },
      //     {
      //       name: 'Sueldos',
      //       path: '/cashbox/salaries',
      //       exact: true
      //     }
      //   ]
      // }
    ]
  },
  {
    name: 'Ingreso',
    path: '/income',
    icon: 'solution',
    children: [
      {
        name: 'Matricula',
        path:'/income/enrollment',
        exact: true
      },
      {
        name: 'Pension',
        path:'/income/monthlypayment',
        exact: true
      },
      {
        name: 'General',
        path:'/income/general',
        exact: true
      }
    ]
  },
  {
    name: 'Egreso',
    path: '/payout',
    icon: 'solution',
    children: [
      {
        name: 'General',
        path:'/payout/general',
        exact: true
      },
      {
        name: 'Salario',
        path:'/payout/salary',
        exact: true
      },
    ]
  },
  {
    name: 'Recursos Humanos',
    path: '/rrhh',
    icon: 'user',
    children: [
      {
        name: 'Padres',
        path: '/rrhh/fathers',
        exact: true
      },
      {
        name: 'Madres',
        path: '/rrhh/Mothers',
        exact: true
      },
      {
        name: 'Apoderados',
        path: '/rrhh/parents',
        exact: true
      },
      {
        name: 'Alumnos',
        path: '/rrhh/students',
        exact: true
      },
      {
        name: 'Personal',
        path: '/rrhh/employees',
        exact: true
      }
    ]
  },
  {
    name: 'Administración',
    path: '/administration',
    icon: 'global',
    children: [
      // {
      //   name: 'Caja',
      //   path: '/administration/cashbox',
      //   exact: true
      // },
      {
        name: 'Año academico',
        path: '/administration/academicyears',
        exact: true
      },
      {
        name: 'Niveles',
        path: '/administration/levels',
        exact: true
      },
      {
        name: 'Grados',
        path: '/administration/grades',
        exact: true
      },
      {
        name: 'Aulas',
        path: '/administration/classrooms',
        exact: true
      },
      {
        name: 'Conceptos',
        path: '/administration/concepts',
        exact: true
      },
      {
        name: 'Tipo de Descuentos',
        path: '/administration/typediscounts',
        exact: true
      },
      {
        name: 'Descuentos',
        path: '/administration/discounts',
        exact: true
      },
      {
        name: 'Usuarios',
        path: '/administration/users',
        exact: true
      },
    ]
  },
  {
    name: 'Configuración',
    path: '/configuration',
    icon: 'setting',
    children: [
      {
        name: 'Empresa',
        path: '/configuration/company',
        exact: true
      },
      {
        name: 'Sedes',
        path: '/configuration/seats',
        exact: true
      }
    ]
  }
];

  