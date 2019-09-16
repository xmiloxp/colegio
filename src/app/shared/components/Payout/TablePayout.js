import React, { Fragment } from 'react';

const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
}
const subtotal = (items) => {
    return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}

const TablePayout = ({ values, onRemoveDetail }) => {
    // console.log(values);
    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Monto</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                 {!!values && values.length>0 ?
                     values.map((row, index )=>(
                         <tr key={index}>
                             <td>{row.service.label}</td>
                             <td>{`S/ ${row.amount}`}</td>
                             <td><button onClick={()=>onRemoveDetail(index)}>+</button></td>
                         </tr>
                     ))
                    //  <TableRow>
                    //      <TableCell>Total</TableCell>
                    //      <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    //  </TableRow> 
                      :
                        <tr>
                            <td colSpan={3} align="center">No hay datos aun</td>
                        </tr>
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default TablePayout;