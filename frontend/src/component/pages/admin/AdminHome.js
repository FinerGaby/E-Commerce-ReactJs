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
                   <table className="tables-admin">
                    <caption>Listado de productos admin</caption>
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha:</th>
                        <th scope="col">Precio:</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Editar / Quitar</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           data.map( (productos, index) => {
                                
                                return (
                                    <tr key={productos.id}>
                                    <td data-label="Nombre">{productos.title} </td>
                                    <td data-label="Fecha">04/01/2016</td>
                                    <td data-label="Precio">${productos.precio}</td>
                                    <td data-label="Categoria">{productos.categoria}</td>
                                    <td data-label="Quitar"><Link to={`/editarproducto/${productos.id}`}><i class="material-icons">edit</i></Link>  <span onClick={() => handleDelete(productos.id)}><i className="material-icons">delete</i></span></td>
                                    </tr>
                                )})
                           }
                           </tbody>
                         </table>
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
