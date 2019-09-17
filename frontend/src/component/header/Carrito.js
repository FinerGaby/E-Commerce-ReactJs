import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
           const { cart, handleCartDelete} = value;

           let MyComponent
           if(cart.length === 0) {
            MyComponent = <span>no item</span>
           }  else {
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
                Total: ${precioTotal}<br />
                <Link to={"/checking"}>Checkout page</Link>

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
        
            </React.Fragment>
            )}}
        </CartConsumer>
    );
}

export default Carrito
