import React from 'react'
import Carrito from './Carrito';

function MainHeader() {
    return (
        <header className="header">
            <nav className="menu">
                <ul>
                    <li>Home</li>
                    <li>Tienda</li>
                    <li className="logo">N I K E</li>
                    <li>Empresa</li>
                    <li>Contacto</li>
                </ul>
            </nav>
        <Carrito />
        </header>
    )
}

export default MainHeader
