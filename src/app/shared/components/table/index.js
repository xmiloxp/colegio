import React from 'react';
import { Table as TableAntd } from 'antd';

const Table = ({columns, data}) => {
    return (
        <TableAntd columns={columns} dataSource={data} />
    );
};

export default Table;
