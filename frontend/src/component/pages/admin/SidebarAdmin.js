import React from 'react';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import AdminHome from './AdminHome';
import AgregarProducto from './AgregarProducto';



const SidebarAdmin = () => {
    return (
        <React.Fragment>
        <div className="container-tienda-flex">
            <Tabs selected={1}>
                <Tab title="Home"><AdminHome /></Tab>
                <Tab title="Agregar Producto"><AgregarProducto /></Tab>
                <Tab title="Agregar Categoria">Test 3</Tab>
            </Tabs>
            </div>
        </React.Fragment>
    )
}

export default SidebarAdmin
