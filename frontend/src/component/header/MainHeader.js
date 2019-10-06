import React from 'react';
import { Link } from 'react-router-dom';
import Carrito from './Carrito';

function MainHeader() {
    return (
        <header className="header">
        <div className="logo"><Link to={"/"}>NIKE</Link></div>
            <nav className="menu">
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/tienda"}>Tienda</Link></li>
                    <li><Link to={"/empresa"}>Empresa</Link></li>
                    <li><Link to={"/contacto"}>Contacto</Link></li>
                </ul>
            </nav>
        <Carrito />
        <div className="agregar">
                     <Link to={"/adminhome"}>
                     <i className="material-icons">
                        perm_identity
                        </i>
                     </Link>
                </div>
        </header>
    )
}

export default MainHeader
