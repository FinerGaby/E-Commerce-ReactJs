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
            <table>
            <caption>Summary CheckCart</caption>
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha:</th>
                <th scope="col">Precio:</th>
                <th scope="col">Cantida</th>
                <th scope="col">Quitar</th>
                </tr>
            </thead>
            <tbody>
            {cart.map( (e, i) => {
                return (
                    <tr key={e._id}>
                    <td data-label="Nombre">{e.title}</td>
                    <td data-label="Fecha">04/01/2016</td>
                    <td data-label="Precio">${e.precio}</td>
                    <td data-label="Cantidad">03/01/2016 - 03/31/2016</td>
                    <td data-label="Quitar"><span onClick={() => handleCartDelete(e._id)}><i className="material-icons">delete</i></span></td>
                    </tr>
                )}
                )}
                <tr>
                <td data-label="Monto Total">Total: ${precioTotal}</td>
                </tr>
                </tbody>
                </table>
                <div>Boton pagar</div>
             </React.Fragment>
           }

            return (
            <React.Fragment>
                <div className="container-tienda">
                    {MyComponent}
                </div>
            </React.Fragment>
            )}}
        </CartConsumer>
    );
}

export default CheckCart
