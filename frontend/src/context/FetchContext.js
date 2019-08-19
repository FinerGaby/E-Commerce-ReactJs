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
    const filterCart = data.filter(e => id === e.id)
    const juntar = cart.concat(filterCart)
    setCart(juntar)
    console.log(cart)
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