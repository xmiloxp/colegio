import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';


const TablePayout = ({ values, onRemoveDetail }) => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Concepto</TableCell>
                        <TableCell>Alumno</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Nivel</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                 {!!values && values.length>0 ?
                     values.map((row, index )=>(
                         <TableRow key={index}>
                             <TableCell>{row.concept}</TableCell>
                             <TableCell>{row.student.label}</TableCell>
                             <TableCell>{row.date}</TableCell>
                             <TableCell>{row.nivel.label}</TableCell>
                             <TableCell><button onClick={()=>onRemoveDetail(index)}>+</button></TableCell>
                         </TableRow>
                     ))
                      :
                        <TableRow>
                            <TableCell colSpan={5} align="center">No hay datos aun</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TablePayout;