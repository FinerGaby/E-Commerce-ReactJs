import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';


const ProductoId = (props) => {

    const [dataId, setDataId] = useState(false);

    return (
        <FetchConsumer>
            {(value) => {
                
                //accedo a los datos del estado
                const { data } = value;

                if (!dataId) {
                    //Parseo a number porque props.id viene en formato string y no me dejaba realizar el filtrado
                    //console.log(typeof props.id)
                    const parseoId = parseInt(props.id);
                    const filter = data.filter(e => e.id === parseoId);
                    setDataId(filter[0]);
                }

                let MyComponent
                if (dataId === undefined) {
                    MyComponent = <div>Cargando</div>
                } else {
                    const { title, precio, descripcion, imagen, color, talle, id } = dataId;
                    if (imagen === undefined) { return }
                    MyComponent =
                    <div className="container-tienda">
                        <div className="flex-box">
                            <div className="imagenes-muestra">
                                {console.log(imagen)}
                                { imagen.map( e => <div key={e}>{e}</div> ) }
                            </div>
                        </div>
                    </div>

                }


                return(
                    <React.Fragment>
                    <div>{props.id}</div>
                    <div>{MyComponent} </div>
                    </React.Fragment>
                )
            }}
        </FetchConsumer>
    )
}

export default ProductoId
