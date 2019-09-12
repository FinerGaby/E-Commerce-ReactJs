import React from 'react';
import { Link } from 'react-router-dom';
import { FetchConsumer } from '../../../context/FetchContext';
import SidebarAdmin from './SidebarAdmin';


const AdminHome = () => {

    return (
        <FetchConsumer>
            {(value) => {
               
               const { data, handleDelete } = value;

               let MyComponent;
               if( data.lenght === 0 ) {
                   MyComponent = <div>no hay datos</div>
               } else {
                   MyComponent =
                   <div>
                   Filtra por categoria
                  Estadisticas?
                       {
                           data.map( (productos, index) => {
                                
                                return (
                                    <div key={productos.id}>
                                    {productos.title} - {productos.precio} - 
                                    <Link to={`/editarproducto/${productos.id}`}>Editar</Link>
                                    <div onClic={() => handleDelete(productos.id)} className="delete-producto">Quitar onClick</div>
                                    </div>
                                )})
                           }
                    </div>
               }
            
            return (
                <React.Fragment>
                    <div className="container-tienda-flex">
                        <SidebarAdmin />
                        {MyComponent}
                    </div>
                </React.Fragment>
            )}}
        </FetchConsumer>
    )
}

export default AdminHome
