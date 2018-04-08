import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <nav class="navbar navbar-light navbar-fixed-top" style={{backgroundColor: "#f8f8f8"}}>
            <div class="container-fluid container-fluid-spacious">
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><Link to={'/'}>Metodo de los Centros Cuadrados</Link></li>
                        <li><Link to={'/MC'}>Metodo Congruencial</Link></li>
                        <li><Link to={'/MCM'}>Metodo Congruencial Mixto</Link></li>
                        <li><Link to={'/GM'}>Generador Multiplicativo</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Header;
