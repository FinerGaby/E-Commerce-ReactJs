import React from 'react';
import { Link } from 'react-router-dom';





const SidebarAdmin = () => {
    return (
        <React.Fragment>
            <div className="sidebar-admin">
                <ul>
                    <li><Link to={"/adminhome"}>Home</Link></li>
                    <li><Link to={"/agregar"}>Agregar</Link></li>
                    <li>Agregar Categoria</li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SidebarAdmin
