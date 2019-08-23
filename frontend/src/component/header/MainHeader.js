import React from 'react';
import { Link } from 'react-router-dom';
import Carrito from './Carrito';

function MainHeader() {
    return (
        <header className="header">
            <nav className="menu">
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/tienda"}>Tienda</Link></li>
                    <li className="logo"><Link to={"/"}>NIKE</Link></li>
                    <li><Link to={"/empresa"}>Empresa</Link></li>
                    <li><Link to={"/contacto"}>Contacto</Link></li>
                </ul>
            </nav>
        <Carrito />
        </header>
    )
}

export default MainHeader
