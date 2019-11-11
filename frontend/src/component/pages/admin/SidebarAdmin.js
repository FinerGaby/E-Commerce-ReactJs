import React from 'react';
import { Link } from 'react-router-dom';





const SidebarAdmin = () => {
    return (
        <React.Fragment>
            <div className="sidebar-cat">
                <ul>
                <li class="filtros-name"><i className="material-icons">filter_list</i>Menu</li>
                    <li><Link to={"/adminhome"}>Home Admin</Link></li>
                    <li><Link to={"/agregar"}>Crear Producto</Link></li>
                    <li><Link to={"/createcategory"}>Crear Categoria</Link></li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SidebarAdmin
