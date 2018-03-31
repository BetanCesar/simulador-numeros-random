import React from 'react';
import TableRow from "../TableRow";

const ResultsTable = ({results}) => {
    console.log(results);
    return(
        <div>
           <table>
               <tbody>
               <tr>
                   <th>Generador</th>
                   <th>Operacion</th>
                   <th>No. aleatorio</th>
                   <th>Ri</th>
               </tr>
                   {results.map((result, i) =>
                       <TableRow key={i} {...result}/>
                   )}
               </tbody>
           </table>
        </div>

    );
};


export default ResultsTable;