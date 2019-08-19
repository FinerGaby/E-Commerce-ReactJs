import React from 'react';
import { FetchConsumer } from '../../context/FetchContext';


function Carrito()  {

    return (
        <FetchConsumer>
            {(value) => { 

           //accedo a los datos del context
           const { cart } = value;
           console.log(cart)
      
           

            return (
                <React.Fragment>
        <div className="carrito">
            Carrito <strong>{cart.length}</strong>
        </div>
        <div className="agregar">
            Agregar
        </div>
        </React.Fragment>
            )}}
        </FetchConsumer>

    );
   
}

export default Carrito
