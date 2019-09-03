import React from 'react';
import { FetchConsumer } from '../../../context/FetchContext';


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
                   <React.Fragment>
                       {
                           data.map( (productos, index) => {
                                
                                return (
                                    <div key={productos.id}>
                                    {productos.title} - {productos.precio} - 
                                    <div onClick={() => handleDelete(productos.id)} className="delete-producto">Quitar</div>
                                    </div>
                                )})
                           }
                    </React.Fragment>
               }
            
            return (
                    <React.Fragment>
                  Filtra por categoria
                  Estadisticas?
                  {MyComponent}
                  </React.Fragment>
            )}}
        </FetchConsumer>
    )
}

export default AdminHome
