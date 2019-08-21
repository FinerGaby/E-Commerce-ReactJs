import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchContext = React.createContext();
export const FetchConsumer = FetchContext.Consumer;

const FetchProvider = (props) => {

  const [fav, setFav] = useState({});
  const [data, setData] = useState([]);


  useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(`http://localhost:8080/productos`);
          console.log(res);
          const fetchingArray = res.data;

          //Este es para cuando el objecto este en favoritos -- no se si lo usare
          const filterFetching = fetchingArray.filter(e => true === e.fav);
          setFav(filterFetching[0])

          //guardo los datos en el estado "data"
          setData(fetchingArray)
          
        }
        fetchData();
      }, []);
  
  

    return (

      <FetchContext.Provider
        value={{
            fav: fav,
            data: data
        }}
      >
       {props.children}
      </FetchContext.Provider>
    );
};

export default FetchProvider;