import React from 'react';
import { FetchConsumer } from '../../../context/FetchContext';


const ProductoId = (props) => {


    return (
        <FetchConsumer>
            {(value) => {
                
                //accedo a los datos del estado
                const { fetchId, dataId } = value;

                if(dataId === false) {
                    fetchId(props.id);
                } 

                let MyComponent
                if (dataId.data === undefined) {
                    console.log("cargando")
                } else {
                    const { title } = dataId.data
                    
                    MyComponent =
                    <div>{title}</div>

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
