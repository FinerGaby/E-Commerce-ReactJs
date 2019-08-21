import React, { useState } from 'react';
import { CartConsumer } from '../../context/CartContext';


function Carrito()  {

    const [menuHidden, setMenuHidden] = useState(false);

    let handleMenu
        handleMenu = () => {
            if(!menuHidden) {
                setMenuHidden(true)
            } else {
                setMenuHidden(false)
            }}

    return (
        <CartConsumer>
            {(value) => { 

           //accedo a los datos del context
           const { cart } = value;

           let MyComponent
           if(cart.length === 0) {
            MyComponent = <span>no item</span>
           }  else {
            var precioTotal = cart.reduce(function(prev, cur) {
                             return prev + cur.precio;
                            }, 0);            
            MyComponent =
            <React.Fragment>
            {cart.map( (e, i) => {
                return (
                    <div key={e.id}>
                        {e.title} - ${e.precio}<br />
                    </div>
                )}
                )}
                Total: ${precioTotal}
             </React.Fragment>
           }

            return (
            <React.Fragment>
                <div onClick={() => handleMenu()} className="carrito">
                    Carrito <strong>{cart.length}</strong>
                {menuHidden ? 
                    <div className="carrito-sub">{MyComponent}</div>
                : null }
                </div>
                <div className="agregar">
                     agregar
                </div>
            </React.Fragment>
            )}}
        </CartConsumer>
    );
}

export default Carrito
