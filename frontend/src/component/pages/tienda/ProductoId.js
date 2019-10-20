import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';
import { CartConsumer } from '../../../context/CartContext';

import Galeria from './Galeria';


const ProductoId = (props) => {

    const [dataId, setDataId] = useState(false);

    return (
        <CartConsumer>
            {(cart) => (
        <FetchConsumer>
            {(value) => {
                
                const { handleCart } = cart;
                
                //accedo a los datos del estado
                const { data } = value;

                if (!dataId) {
                    //Parseo a number porque props.id viene en formato string y no me dejaba realizar el filtrado
                    //console.log(typeof props.id)
                    const parseoId = parseInt(props._id);
                    const filter = data.filter(e => e._id === parseoId);
                    setDataId(filter[0]);
                }

                let MyComponent
                if (dataId === undefined) {
                    MyComponent = <div>Cargando</div>
                } else {
                    const { title, precio, descripcion, imagen, color, talle, _id } = dataId;
                    if (imagen === undefined) { return }
                    MyComponent =
                    <div className="container-tienda">
                        <div className="flex-box">
                            <div className="imagenes-muestra">
                                <Galeria imagen={imagen}/>
                            </div>
                            <div className="info-producto">
                                <div className="titulo-producto">{title}</div>
                                <div className="descripcion-producto">{descripcion}</div>
                                <div className="flex-box">
                                { color.map(colores => <div key={colores} className="colores-producto">{colores}</div> ) }
                                </div>
                                <div className="flex-box">
                                { talle.map(talles => <div key={talles} className="talles-producto">{talles}</div> ) }
                                </div>
                                <div className="precio-producto">Precio final: ${precio}</div>
                                <div onClick={() => handleCart(_id, data)} className="button-add">Add Cart</div>
                            </div>
                        </div>
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
    )
}

export default ProductoId
