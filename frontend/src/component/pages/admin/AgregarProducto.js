import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FetchConsumer } from '../../../context/FetchContext';
import SidebarAdmin from './SidebarAdmin';

const AgregarProducto = (props) => {

    const [formValues, setFormValues] = useState({
        id: '',
        title: '',
        precio: '',
        descripcion: '',
        imagen: [''],
        color: [''],
        talle: [''],
        categoria: '------',
        editar: false
    });
    const [validationForm, setValidationForm] = useState(false)
    const [categoriasGet, setCategoriasGet] = useState([])

    

          useEffect(() => {
            if(props.id) {
                   let editedProduct = async () => {
                        const categoriasGet = await axios.get(`http://localhost:8080/categoria`);
                        setCategoriasGet(categoriasGet.data)
                        const res = await axios.get(`http://localhost:8080/productos/${props.id}`);
                        const {data} = res
                        console.log(data)
                        const { title, imagen, precio, descripcion, color, talle, id, categoria } = data
                        setFormValues({
                          id,
                          precio,
                          descripcion, 
                          color, 
                          talle, 
                          title,
                          imagen,
                          categoria,
                          editar: true
                        })
                      }
                      editedProduct();
            } else {
                let resCategoria = async () => { 
                    let categoriasGet = await axios.get(`http://localhost:8080/categoria`); 
                    setCategoriasGet(categoriasGet.data)
                    setFormValues({
                        id: '',
                        title: '',
                        precio: '',
                        descripcion: '',
                        imagen: [''],
                        color: [''],
                        talle: [''],
                        categoria: '------',
                        editar: false
                      })
                }
                resCategoria();
            }
          }, [props.id]);


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

    let handleDeleteInput
    handleDeleteInput = (id, estado) => {
        let filtradoDelete
        switch (estado) {
            case 'imagen': 
             filtradoDelete = formValues.imagen.filter((array, index) => index !== id || index === 0)
                        setFormValues({
                            ...formValues,
                            imagen: filtradoDelete
                        })
            break;
            case 'color': 
             filtradoDelete = formValues.color.filter((array, index) => index !== id)
                        setFormValues({
                            ...formValues,
                            color: filtradoDelete
                        })
            break;
            case 'talle': 
            filtradoDelete = formValues.talle.filter((array, index) => index !== id)
                        setFormValues({
                            ...formValues,
                            talle: filtradoDelete
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


    let handleChangeCat
    handleChangeCat = (e) => {
        console.log(e.target.value)
       setFormValues({
            ...formValues,
           categoria: e.target.value
        }) 
    }

 
    
    return (
        <FetchConsumer>
            {(value) => { 

            //accedo a el estado de cart
            const { handleSubmit } = value;

            // Boton checking add recibe index y luego uso reduce y concat
            // FALTAN MUCHAS COSAS EN ESPECIAL FORMATO STRING Y NUMBER EN PRECIO PORQUE CUANDO SE CREAN VIENEN EN STRING

            return (
                <React.Fragment>
                <div className="container-tienda-flex">
                <SidebarAdmin />
             <div>
             {validationForm ? <div className="error-validation">Te falto completar un campo</div> : null}      
            <form className="form-add" onSubmit={(e) => {
                    e.preventDefault();

                    let validationImagen = formValues.imagen.includes('') || formValues.imagen.length === 0;
                    let validationColor = formValues.color.includes('') || formValues.color.length === 0;
                    let validationTalle = formValues.talle.includes('') || formValues.talle.length === 0;
                    let validationGlobal = formValues.title === '' || formValues.precio === '' || formValues.descripcion === '' || formValues.id === '';

                    if(validationGlobal || validationImagen || validationColor || validationTalle) {
                        setValidationForm(true)
                        return
                    }

                    handleSubmit(formValues)
                    setValidationForm(false)
                    
                }}>
                    <label id="idtest" htmlFor="idtest">id user:</label>
                    <input type="text" name="id" onChange={handleChange} value={formValues.id} />

                    <label id="idtest" htmlFor="idtest">precio:</label>
                    <input type="text" name="precio" onChange={handleChange} value={formValues.precio}/>

                    <label id="idtest" htmlFor="idtest">imagen:</label>
                    { formValues.imagen.map((imagen, index) => {
                        let myButton
                        if(index !== 0) { myButton = <h4 onClick={() => handleDeleteInput(index, 'imagen')} >Quitar</h4> }
                        return(
                            <React.Fragment key={index}>
                                <input type ="text" key={index}  name="imagen"  onChange={handleChangeArray(index, 'imagen')} value={formValues.imagen[index]} />
                                {myButton}
                             </React.Fragment>
                        )
                    })}
                    <button type="button" onClick={() => handleAddInput('imagen')} >  Agregar otra imagen </button>
                    <label id="userid" htmlFor="avatar">title:</label>
                    <input type="text" name="title" onChange={handleChange} value={formValues.title} />

                  
                    <label id="userid" htmlFor="userid">descripcion:</label>
                    <textarea name="descripcion" onChange={handleChange} value={formValues.descripcion} />

                    
                    <label id="idtest" htmlFor="idtest">categoria:</label>
                    <select value={formValues.categoria} onChange={handleChangeCat}>
                         <option value="-----">----</option>
                        {categoriasGet.map(cat =>
                             <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )};
                    </select>


                    <label id="idtest" htmlFor="idtest">color:</label>
                    { formValues.color.map((color, index) => {
                        let myButton
                        if(index !== 0) { myButton = <h4 onClick={() => handleDeleteInput(index, 'color')} >Quitar</h4> }
                        return(
                            <React.Fragment key={index}>
                            <input type="text" key={index}  name="color"  onChange={handleChangeArray(index, 'color')} value={formValues.color[index]} />
                            {myButton}
                            </React.Fragment>
                        )
                    })}
                    <button type="button" onClick={() => handleAddInput('color')} >  Agregar otro color </button>


                    <label id="userid" htmlFor="userid">talle:</label>
                    { formValues.talle.map((talles, index) => {
                        let myButton
                        if(index !== 0) { myButton = <h4 onClick={() => handleDeleteInput(index, 'talle')} >Quitar</h4> }
                        return (
                            <React.Fragment key={index}>
                            <input type="text" key={index}  name="talle"  onChange={handleChangeArray(index, 'talle')} value={formValues.talle[index]} />
                            {myButton}
                            </React.Fragment>      
                        )
                    })}
                    <button type="button" onClick={() => handleAddInput('talle')} >  Agregar otro talle </button>

                    {formValues.editar ? <input type="submit" value="Editar" /> : <input type="submit" value="Crear" />} 
            </form>
            </div>
            </div>
            </React.Fragment>
            )}}
          </FetchConsumer>
    )
}

export default AgregarProducto
