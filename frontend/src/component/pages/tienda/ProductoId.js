import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';
import { CartConsumer } from '../../../context/CartContext';
import { AuthJwtConsumer } from '../../../context/AuthJwtContext';

import axios from 'axios';


import Galeria from './Galeria';


const ProductoId = (props) => {

    const [dataId, setDataId] = useState(false);
    const [comentarios, setComentarios] = useState({
        id: '',
        usuario: '',
        comment: ''
    })

    return (
        <AuthJwtConsumer>
            {(autho) => (
        <CartConsumer>
            {(cart) => (
        <FetchConsumer>
            {(value) => {

                const { dataLog, auth } = autho
                
                const { handleCart } = cart;
                
                //accedo a los datos del estado
                const { data } = value;

                let handleChange
                handleChange = async (e) => {
                    console.log(e.target.value)
                    setComentarios({
                            id: props.id,
                            usuario: dataLog.name,
                            comment: e.target.value
                        }) 
                }


                let handleSubmit
                handleSubmit = async (e) => {
                    e.preventDefault();
                    console.log(comentarios)
                    await axios.put(`http://localhost:8080/api/comentarios`, comentarios)
                    const res = await axios.get(`http://localhost:8080/api/productos/${props.id}`);
                    setDataId(res.data);
                    setComentarios({
                        id: props.id,
                        usuario: dataLog.name,
                        comment: ''
                    })
                }

                if (!dataId) {
                    //Parseo a number porque props.id viene en formato string y no me dejaba realizar el filtrado
                    console.log(typeof props.id)
                    const filter = data.filter(e => e._id === props.id);
                    setDataId(filter[0]);
                }

                let MyComponent
                if (dataId === undefined) {
                    MyComponent = <div>Cargando</div>
                } else {
                    console.log(dataId)
                    const { title, precio, descripcion, imagen, color, talle, _id, archive } = dataId;
                    if (imagen === undefined) { return }
                    MyComponent =
                    <div className="container-tienda">
                        <article className="flex-box">
                            <div className="imagenes-muestra">
                                <Galeria imagen={imagen}/>
                            </div>
                            <div className="info-producto">
                                <div className="titulo-producto">{title}</div>
                                <div className="descripcion-producto">{descripcion}</div>
                                <h2>Colores disponibles:</h2>
                                <div className="flex-box">
                                { color.map(colores => { 
                                    let coloresStyle
                                    coloresStyle = {
                                        background: `${colores}`,
                                        width: 30,
                                        height: 30,
                                        borderRadius: 50
                                    }
                                    return (
                                    <div key={colores} style={coloresStyle}></div> )})}
                                </div>
                                <h2>Talles disponibles:</h2>
                                <div className="flex-box">
                                { talle.map(talles => <div key={talles} className="talles-producto">{talles}</div> ) }
                                </div>
                                <div className="precio-producto">Precio final: ${precio}</div>
                                <div onClick={() => handleCart(_id, data)} className="button-add">Add Cart</div>
                            </div>
                        </article>
                        <article className="section-comentarios">
                        <div className="comentarios">
                         <h2>Comentarios: {archive.length} </h2>
                         {archive.map((e, index) => <div className="comment" key={index}>{e.usuario}<br/>{e.comment}</div>)}
                         </div>
                         {auth ? 
                        <form className="form-comment" onSubmit={handleSubmit}>
                        <label id="idtest" htmlFor="idtest">Deja tu comentario:</label>
                        <textarea name="comment" placeholder="Inserte el comentario" onChange={handleChange} value={comentarios.comment} />
                        <input type="submit" value="Enviar" />
                        </form>
                         : <div>Logeate para comentar</div> }
                        </article>

                    </div>

                }


                return(
                    <React.Fragment>
                    {MyComponent}
                    </React.Fragment>
                )
            }}
        </FetchConsumer>
        )}
        </CartConsumer>
        )}
        </AuthJwtConsumer>
    )
}

export default ProductoId
