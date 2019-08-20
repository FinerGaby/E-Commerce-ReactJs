import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchContext = React.createContext();
export const FetchConsumer = FetchContext.Consumer;

const FetchProvider = (props) => {

  const [fav, setFav] = useState({});
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  let handleCart;
  handleCart = (id) => {
        
    // como funciona esto :thiking:
    // Primero sabemos que el estado de cart viene un array vacio entonces hago un find
    // sabemos que cuando hago el find y el array esta vacio es undefined
    // entonces en la validacion sabemos que el estado es undefinend lo que lo guarda
    // FORMATO DEL LOOP --- sabemos que ahora cart tiene un array en el carrito con una id
    // entonces agrego otro producto 
    // sabemos que ahora me va a llegar una id para que en find la busque por la id
    // Si encontro el array con la misma id sabemos que no es undefinend entonces no se va a guardar
    // entonces agrego otro producto este no tiene la misma id que se encuentra en el estado entonces es undefinend
    // ejecuto para que se guarde
    const find = cart.find(e => id === e.id);
    if (find === undefined) {
      const filterCart = data.filter(e => id === e.id)
      const juntar = cart.concat(filterCart)
      setCart(juntar)
      console.log(cart)
    } else {
      return
    }
    
    //setCart(...cart, filterCart);
    
  }

  useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(`http://localhost:8080/productos`)
          console.log(res)
          const fetchingArray = res.data
          const filter = fetchingArray.filter(e => true === e.fav);
          setFav(filter[0])
          setData(fetchingArray)

  
        }
        fetchData();
      }, []);
  
  

    return (

      <FetchContext.Provider
        value={{
            fav: fav,
            data: data,
            cart: cart,
            handleCart: handleCart
        }}
      >
       {props.children}
      </FetchContext.Provider>
    );
};

export default FetchProvider;