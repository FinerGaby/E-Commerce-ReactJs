import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchContext = React.createContext();
export const FetchConsumer = FetchContext.Consumer;

const FetchProvider = (props) => {

  const [fav, setFav] = useState({});
  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState(false);

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

    let fetchId
    fetchId = async (id) => {
      const res = await axios.get(`http://localhost:8080/productos/${id}`)
      const dataRes = res.data
      setDataId(res)
    }
  
  

    return (

      <FetchContext.Provider
        value={{
            fav: fav,
            data: data,
            fetchId: fetchId,
            dataId: dataId
        }}
      >
       {props.children}
      </FetchContext.Provider>
    );
};

export default FetchProvider;