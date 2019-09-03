import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';



const AgregarProducto = () => {

    const [formValues, setFormValues] = useState({
        id: '',
        title: '',
        precio: '',
        descripcion: '',
        imagen: [''],
        color: [''],
        talle: ['']
    })


    let handleAddInput
    handleAddInput = (estado) => {
        switch (estado) {
            case 'imagen':  setFormValues({ 
                ...formValues,
                imagen: [ ...formValues.imagen, "" ],
            })
            break;
            case 'color': setFormValues({ 
                ...formValues,
                color: [...formValues.color, ""]
            })
            break;
            case 'talle': setFormValues({ 
                ...formValues,
                talle: [...formValues.talle, ""]
            })
            break;
            default:
                break;
        }
    }
    



    let handleChangeArray
    handleChangeArray = (id, estado) => e => {
       switch (estado) {
           case 'imagen': 
                    formValues.imagen[id] = e.target.value;
                            setFormValues({ 
                                ...formValues,
                                [e.target.name]: e.target.value,
                                imagen: formValues.imagen
                            })
                        break;
            case 'color': 
                    formValues.color[id] = e.target.value;
                    setFormValues({ 
                        ...formValues,
                        [e.target.name]: e.target.value,
                        color: formValues.color
                    })
                    break;
            case 'talle': 
                    formValues.talle[id] = e.target.value;
                    setFormValues({ 
                        ...formValues,
                        [e.target.name]: e.target.value,
                        talle: formValues.talle
                    })
                    break;
           default:
               break;
       }
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

            // FALTAN MUCHAS COSAS EN ESPECIAL FORMATO STRING Y NUMBER EN PRECIO PORQUE CUANDO SE CREAN VIENEN EN STRING

            return (
                <React.Fragment>
            <form className="form-add" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formValues)
                }}>
                    <label id="idtest" htmlFor="idtest">id user:</label>
                    <input type="text" name="id" onChange={handleChange} required />

                    <label id="idtest" htmlFor="idtest">precio:</label>
                    <input type="text" name="precio" onChange={handleChange} required />

                    <label id="idtest" htmlFor="idtest">imagen:</label>
                    { formValues.imagen.map((imagen, index) => 
                      <input type ="text" key={index}  name="imagen"  onChange={handleChangeArray(index, 'imagen')} required />
                    )}
                    <button type="button" onClick={() => handleAddInput('imagen')} >  Agregar otra imagen </button>
                    <label id="userid" htmlFor="avatar">title:</label>
                    <input type="text" name="title" onChange={handleChange} required />

                  
                    <label id="userid" htmlFor="userid">descripcion:</label>
                    <textarea name="descripcion" onChange={handleChange} required />


                    <label id="idtest" htmlFor="idtest">color:</label>
                    { formValues.color.map((color, index) => 
                      <input type="text" key={index}  name="color"  onChange={handleChangeArray(index, 'color')} required />
                    )}
                    <button type="button" onClick={() => handleAddInput('color')} >  Agregar otro color </button>


                    <label id="userid" htmlFor="userid">talle:</label>
                    { formValues.talle.map((talles, index) => 
                      <input type="text" key={index}  name="talle"  onChange={handleChangeArray(index, 'talle')} required />
                    )}
                    <button type="button" onClick={() => handleAddInput('talle')} >  Agregar otro talle </button>


                    <input type="submit" value="Crear" />
            </form>
            </React.Fragment>
            )}}
          </FetchConsumer>
    )
}

export default AgregarProducto
