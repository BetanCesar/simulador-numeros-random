import React from 'react';
import './TableRow.css';

const TableRow = (result) => {
    return(
       <tr>
           <td>{result.generator}</td>
           <td>{result.operation}</td>
           <td>{result.randomNumber}</td>
           <td>{result.ri}</td>
       </tr>
    );
};






export default TableRow;
