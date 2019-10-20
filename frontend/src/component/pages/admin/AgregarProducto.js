import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FetchConsumer } from '../../../context/FetchContext';
import SidebarAdmin from './SidebarAdmin';

const AgregarProducto = (props) => {

    const [formValues, setFormValues] = useState({
        _id: '',
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


          useEffect(() => {
            if(props.id) {
                   let editedProduct = async () => {
                        const res = await axios.get(`http://localhost:8080/api/productos/${props.id}`);
                        const {data} = res
                        console.log(data)
                        const { title, imagen, precio, descripcion, color, talle, _id, categoria } = data
                        setFormValues({
                          _id,
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

                    setFormValues({
                        title: '',
                        precio: '',
                        descripcion: '',
                        imagen: [''],
                        color: [''],
                        talle: '',
                        categoria: '------',
                        editar: false
                      })
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
            default:
                break;
        }
    }
    



    let handleChangeArray
    handleChangeArray = (id, estado) => e => {
        //console.log(e.target.value)
        // console.log(URL.createObjectURL(e.target.files[0]))
       switch (estado) {
           case 'imagen': 
                    console.log(e.target.files[0])
                    formValues.imagen[id] = e.target.files[0];
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
            default:
                break;
        }
    }
    


    let handleChange
    handleChange = (e) => {
        console.log(e.target.value)
       setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        }) 
    }

    let handleChangeNumber
    handleChangeNumber = (e) => {
        const spaceValidation = e.target.value;
        const regex = /^[0-9\b]+$/;
        if (spaceValidation === '' || regex.test(spaceValidation)) {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            }) 
        }
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
            const { handleSubmit, categoriasGet } = value;

            // Boton checking add recibe index y luego uso reduce y concat
            // FALTAN MUCHAS COSAS EN ESPECIAL FORMATO STRING Y NUMBER EN PRECIO PORQUE CUANDO SE CREAN VIENEN EN STRING

            return (
                <React.Fragment>
                <div className="container-tienda-flex">
                <SidebarAdmin />
             <div className="tables-admin">
             {validationForm ? <div className="error-validation">Te falto completar un campo</div> : null}      
            <form className="form-add"  onSubmit={(e) => {
                    e.preventDefault();

                    let validationImagen = formValues.imagen.includes('') || formValues.imagen.length === 0;
                    let validationColor = formValues.color.includes('') || formValues.color.length === 0;
                    let validationTalle = formValues.talle.length === 0;
                    let validationGlobal = formValues.title === '' || formValues.precio === '' || formValues.descripcion === '';

                    if(validationGlobal || validationImagen || validationColor || validationTalle) {
                        setValidationForm(true)
                        return
                    }

                    handleSubmit(formValues)
                    setValidationForm(false)
                    
                }}>

                    {props.id ? <input type="text" placeholder="Id del producto" name="id" value={formValues._id} /> : null  }
                    
                    <div className="flex-input">
                    <input type="text" placeholder="Inserte el nombre del producto" name="title" onChange={handleChange} value={formValues.title} />

                    <span>Categoria:</span>
                    <select value={formValues.categoria} onChange={handleChangeCat}>
                         <option value="-----">------</option>
                        {categoriasGet.map(cat =>
                             <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )};
                    </select>
                     </div>

                    <input type="text"  placeholder="Inserte el precio" name="precio" onChange={handleChangeNumber} value={formValues.precio}/>

                    <textarea name="descripcion" placeholder="Inserte el descripcion" onChange={handleChange} value={formValues.descripcion} />

                    <label id="idtest" htmlFor="idtest">Talle: 34, 55, 66</label>
                    <input type="text" name="talle" placeholder='34, 55, 33'  onChange={handleChange} value={formValues.talle} />
                           

                    <label id="idtest" htmlFor="idtest">Imagen:</label>        
                    <div className="flex-input">
                    { formValues.imagen.map((imagen, index) => {
                        let myButton
                        if(index !== 0) { myButton = <button className="agregarmas danger" type="button"onClick={() => handleDeleteInput(index, 'imagen')} ><i className="material-icons">clear</i></button> }
                        return(
                            <React.Fragment key={index}>
                                <img src={formValues.imagen[index]} />
                                <input type="file" name="imagen" key={index} onChange={handleChangeArray(index, 'imagen')} />
                                {myButton}
                             </React.Fragment>
                        )
                    })}
                    <button className="agregarmas" type="button" onClick={() => handleAddInput('imagen')} > <i className="material-icons">add</i></button>
                    </div>

                    <label id="idtest" htmlFor="idtest">Color:</label>
                    <div className="flex-input">
                    { formValues.color.map((color, index) => {
                        let myButton
                        if(index !== 0) { myButton =  <button className="agregarmas danger" type="button" onClick={() => handleDeleteInput(index, 'color')} ><i className="material-icons">clear</i></button> }
                        return(
                            <React.Fragment key={index}>
                            <input type="color" key={index}  name="color" placeholder="Inserte el color"  onChange={handleChangeArray(index, 'color')} value={formValues.color[index]} />
                            {myButton}
                            </React.Fragment>
                        )
                    })}
                    <button className="agregarmas" type="button" onClick={() => handleAddInput('color')} ><i className="material-icons">add</i> </button>
                    </div>

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
