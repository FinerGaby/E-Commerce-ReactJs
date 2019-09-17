import React, { useState } from 'react';
import axios from 'axios';

const CategoriaAdd = () => {

    const [categoria, setCategoria] = useState({
        name: '',
        id: ''
    })

    let handleChange
    handleChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        }) 
    }
    
    let handleSubmit
    handleSubmit = async e => {
        e.preventDefault();
        console.log(categoria)
       const res = await axios.post(`http://localhost:8080/categoria`, categoria)
       console.log(res)
      }



    return (
        <div className="container-tienda">
            <form onSubmit={handleSubmit}>
            <label id="idtest" htmlFor="idtest">Agregar categoria:</label>
            <input type="text" name="id" onChange={handleChange} value={categoria.id}/>
            <input type="text" name="name" onChange={handleChange} value={categoria.categoria}/>
            <input type="submit" value="Crear" />
            </form>
        </div>
    )
}

export default CategoriaAdd
