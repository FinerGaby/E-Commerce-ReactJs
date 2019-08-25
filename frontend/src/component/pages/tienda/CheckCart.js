import React from 'react';
import { CartConsumer } from '../../../context/CartContext';


const CheckCart = () => {
    return (
        <CartConsumer>
            {(value) => { 

           //accedo a los datos del context
           const { cart, handleCartDelete} = value;

           let MyComponent
           if(cart.length === 0) {
            MyComponent = <span>no tienes item en el carrito, inserte uno</span>
           }  else {
               // Se supone que todo lo que esta en el map tiene que estar en un form y los datos que llegan en los values
               // para luego mandarlos a las rutas que vaya creando con express y req.body
               // crear tables??? o div
            const precioTotal = cart.reduce((prev, cur) => {
                             return prev + cur.precio;
                            }, 0);            
            MyComponent =
            <React.Fragment>
            {cart.map( (e, i) => {
                return (
                    <div key={e.id}>
                        {e.title} - ${e.precio}
                        <span onClick={() => handleCartDelete(e.id)}>Quitar</span><br />
                    </div>
                )}
                )}
                Total: ${precioTotal}
                <div>Boton pagar</div>
             </React.Fragment>
           }

            return (
            <React.Fragment>
                <div className="container-tienda">
                    <div>Check Product</div>
                    {MyComponent}
                </div>
            </React.Fragment>
            )}}
        </CartConsumer>
    );
}

export default CheckCart
