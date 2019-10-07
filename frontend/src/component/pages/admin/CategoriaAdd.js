import React, { useState } from 'react';
import axios from 'axios';
import { FetchConsumer } from '../../../context/FetchContext';
import SidebarAdmin from './SidebarAdmin';



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

    let handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/categoria/${id}`) 
        //aqui falta el get para qeu se actualize
    }

      return (
      <FetchConsumer>
            {(value) => { 

            const { categoriasGet } = value;   
  

    return (
        <React.Fragment>
            
        <div className="container-tienda-flex">
                    <SidebarAdmin />
            <div>
                <form onSubmit={handleSubmit}>
                        <label id="idtest" htmlFor="idtest">Agregar categoria:</label>
                        <input type="text" name="id" onChange={handleChange} value={categoria.id}/>
                        <input type="text" name="name" onChange={handleChange} value={categoria.categoria}/>
                        <input type="submit" value="Crear" />
                 </form>

                {
                categoriasGet.map((cat, index) => 
                    <div>
                        {cat.name}
                        <div class="boton-delete" onClick={() => handleDelete(cat.id)}>delete cat</div>
                    </div>
                        )
                }
            </div>
        </div>
        </React.Fragment>
        )}}
        </FetchConsumer>
    )
}

export default CategoriaAdd
