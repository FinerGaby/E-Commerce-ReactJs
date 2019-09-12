import React from 'react'

const Tab = (props) => {

 {/*  

 import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
 default usarlo
  <React.Fragment>
        <div className="container-tienda-flex">
            <Tabs selected={1}>
                <Tab title="Home"><AdminHome /></Tab>
                <Tab title="Agregar Producto"><AgregarProducto /></Tab>
                <Tab title="Agregar Categoria">Test 3</Tab>
            </Tabs>
            </div>
        </React.Fragment> */}


    return (
        <React.Fragment>{props.children}</React.Fragment>
    )
}

export default Tab
