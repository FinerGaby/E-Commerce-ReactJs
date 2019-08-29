import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';



const AgregarProducto = () => {

    const [formValues, setFormValues] = useState({
        id: '',
        title: '',
        precio: [''],
        descripcion: '',
        imagen: '',
        color: '',
        talle: ''
    })


    let handleAddInput
    handleAddInput = () => {
        setFormValues({ 
            ...formValues,
            precio: [ ...formValues.precio, "" ]
        })
    }

    let handleChangeArray
    handleChangeArray = id => e => {
        formValues.precio[id] = e.target.value;
        setFormValues({ 
            ...formValues,
            [e.target.name]: e.target.value,
            precio: formValues.precio})
    }


    let handleChange
    handleChange = (e) => {

       setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        }) 
    }

 
    
    return (
        <FetchConsumer>
            {(value) => { 

            //accedo a el estado de cart
            const { handleSubmit } = value;

            return (
                <div className="container-tienda">
            <form  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formValues)
                }}>
                    <label id="idtest" htmlFor="idtest">id user:</label>
                    <input type="text" name="id" onChange={handleChange} required />

                    test
                    { formValues.precio.map((precios, index) => 
                      <input type ="text" key={index}  name="precio"  onChange={handleChangeArray(index)} required />
                    )}
                    <button type="button" onClick={handleAddInput} >  Agregar otro precio </button>
                    <label id="userid" htmlFor="avatar">title:</label>
                    <input type="text" name="title" onChange={handleChange} required />

                  
                    <label id="userid" htmlFor="userid">descripcion:</label>
                    <input type="text" name="descripcion" onChange={handleChange} required />

                    <label id="userid" htmlFor="userid">imagen:</label>
                    <input type="text" name="imagen" onChange={handleChange} required />

                    <label id="userid" htmlFor="userid">color:</label>
                    <input type="text" name="color" onChange={handleChange} required />

                    <label id="userid" htmlFor="userid">talle:</label>
                    <input type="text" name="talle" onChange={handleChange} required />

                    <input type="submit" value="Crear" />
            </form>
        </div>
            )}}
          </FetchConsumer>
    )
}

export default AgregarProducto
