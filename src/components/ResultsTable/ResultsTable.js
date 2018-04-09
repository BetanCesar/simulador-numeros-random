import React from 'react';
import TableRow from "../TableRow";

const ResultsTable = ({results}) => {
    return(
        <div className="row">
           <table className="table">
               <thead>
                   <tr>
                       <th>Generador</th>
                       <th>Operacion</th>
                       <th>No. aleatorio</th>
                       <th>Ri</th>
                   </tr>
               </thead>
               <tbody>
                   {results.map((result, i) =>
                       <TableRow key={i} {...result}/>
                   )}
               </tbody>
           </table>
        </div>

    );
};


export default ResultsTable;