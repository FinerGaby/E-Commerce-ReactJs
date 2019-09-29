import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchContext = React.createContext();
export const FetchConsumer = FetchContext.Consumer;

const FetchProvider = (props) => {

  const [fav, setFav] = useState({});
  const [data, setData] = useState([]);

    useEffect(() => {
         let fetching = async () => { fetchData()  }   
      fetching();  
    }, []);

    let fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/productos`);
      console.log(res);
      const fetchingArray = res.data;
  
      //Este es para cuando el objecto este en favoritos -- no se si lo usare
      const filterFetching = fetchingArray.filter(e => true === e.fav);
      setFav(filterFetching[0])
  
      //guardo los datos en el estado "data"
      setData(fetchingArray)
    }
  
    let handleSubmit
    handleSubmit = async (value) => {
      //verificar que reciba 1 categoria seleccionada
      console.log(value)
      const { title, imagen, precio, descripcion, color, talle, id, editar, categoria } = value;
  
      if(editar) {
        const updateProducto = {
          title,
          imagen,
          precio,
          descripcion,
          color,
          categoria,
          talle
        }
        await axios.put(`http://localhost:8080/productos/${id}`, updateProducto) 
        fetchData();

      } else {
        const addProducto = {
          title,
          imagen,
          precio,
          descripcion,
          color,
          categoria,
          talle,
          id
        }

        await axios.post(`http://localhost:8080/productos`, addProducto)
        fetchData();

      }
    }

    let handleDelete
    handleDelete = async (id) => {
      await axios.delete(`http://localhost:8080/productos/${id}`) 
      fetchData();
    }
  

    return (

      <FetchContext.Provider
        value={{
            fav,
            data,
            handleSubmit,
            handleDelete
        }}
      >
       {props.children}
      </FetchContext.Provider>
    );
};

export default FetchProvider;