import React, { useState } from 'react';

const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

const CartProvider = (props) => {

  const [cart, setCart] = useState([]);

  let handleCart;
  handleCart = (id, data) => {
     /* como funciona esto :thiking:
     Primero sabemos que el estado de cart viene un array vacio entonces hago un find
     sabemos que cuando hago el find y el array esta vacio es undefined
     entonces en la validacion sabemos que el estado es undefinend lo que lo guarda
     FORMATO --- sabemos que ahora cart tiene un array en el carrito con una id
     entonces agrego otro producto 
     sabemos que ahora me va a llegar una id para que en find la busque por la id
     Si encontro el array con la misma id sabemos que no es undefinend entonces no se va a guardar
     entonces agrego otro producto este no tiene la misma id que se encuentra en el estado entonces es undefinend
     ejecuto para que se guarde */
    const findData = cart.find(e => id === e.id);
    if (findData === undefined) {
      const filterCart = data.filter(e => id === e.id)
      
      const resultFilter = cart.concat(filterCart)
      setCart(resultFilter)
    } 
    return
  }

  let handleCartDelete
  handleCartDelete = (id) => {
     
    const filterDelete = cart.filter(e => id !== e.id);
    setCart(filterDelete);

  }
 

    return (

      <CartContext.Provider
        value={{
            cart: cart,
            handleCart: handleCart,
            handleCartDelete: handleCartDelete
        }}
      >
       {props.children}
      </CartContext.Provider>
    );
};

export default CartProvider;