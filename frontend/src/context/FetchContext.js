import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchContext = React.createContext();
export const FetchConsumer = FetchContext.Consumer;

const FetchProvider = (props) => {

  const [fav, setFav] = useState({});
  const [data, setData] = useState([]);
  const [categoriasGet, setCategoriasGet] = useState([])


    useEffect(() => {
         let fetching = async () => { fetchData()  }   
      fetching();  
    }, []);

    let fetchData = async () => {
      const categoriasGet = await axios.get(`http://localhost:8080/api/categorias`);
      setCategoriasGet(categoriasGet.data)
      const res = await axios.get(`http://localhost:8080/api/productos`);
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
      console.log(value)
      var talle = value.talle.split(','); // split string on comma space
      console.log(talle)
      const { title, imagenName, precio, descripcion, color, _id, editar, categoria } = value;
      console.log(categoria)
      const formdata = new FormData();
      formdata.append('title', title);
      formdata.append('description', descripcion);
      formdata.append('precio', precio);
      formdata.append('color', JSON.stringify(color));
      formdata.append('talle', JSON.stringify(talle));
      formdata.append('categoria', categoria);
      var arr = value.imagen;
      console.log(value.imagen)
      for (var i = 0; i < arr.length; i++) {
        formdata.append('file', arr[i]);
      }  
   
      if(editar) {
        console.log(...formdata)
        await axios.put(`http://localhost:8080/api/productos/${_id}`, formdata) 
        fetchData();

      } else {
        console.log(...formdata)
        await axios.post(`http://localhost:8080/api/productos`, formdata)

        fetchData();

      }
    }

    let handleDelete
    handleDelete = async (id) => {
      console.log(id)
      await axios.delete(`http://localhost:8080/api/productos/${id}`) 
      fetchData();
    }
  

    return (

      <FetchContext.Provider
        value={{
            fav,
            data,
            categoriasGet,
            handleSubmit,
            handleDelete
        }}
      >
       {props.children}
      </FetchContext.Provider>
    );
};

export default FetchProvider;