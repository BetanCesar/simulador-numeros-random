import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <ul>
            <li><Link to={'/'}>Metodo de los Centros Cuadrados</Link></li>
            <li><Link to={'/MC'}>Metodo Congruencial</Link></li>
            <li><Link to={'/MCM'}>Metodo Congruencial Mixto</Link></li>
            <li><Link to={'/GM'}>Generador Multiplicativo</Link></li>
        </ul>

    );
};


export default Header;
