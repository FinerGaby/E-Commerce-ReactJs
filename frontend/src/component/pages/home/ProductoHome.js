import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';
import SliderHome from './SliderHome';


const ProductoHome = () => {

    const [activeindex, setActiveindex ] = useState(0)

    return (
        <FetchConsumer>
            {(value) => { 

           //accedo a los datos del context
           const {data, fav, handleCart} = value;

           //accedo al primer array de la posicion 0 para el carrousel
           const dataSlider = data[activeindex];

           //actualizo el estado segun el index que me llege del array en <SliderHome />
            let handleSlider
            handleSlider = (e) => {
                setActiveindex(e)
            }

    

           let ResultData
           if (data[0] === undefined) {
               ResultData = <div>no datos</div>
           } else {
            const divStyle = {
                backgroundImage: `url('img/${dataSlider.imagen[0]}.png')`
            };
               ResultData = 
               <React.Fragment>
               <article className="home-flex">
                <div className="title-descripcion">Just do Shoes<br />
                <span>Fire Nike</span></div>
                <div style={divStyle} className="portada-imagen"></div>
                <div className="title-carrito">
                    <div className="title-home">{dataSlider.title}</div>
                    <div className="precio-home">{dataSlider.precio}</div>
                    <div onClick={() => handleCart(dataSlider.id)} className="button-add">Add Cart</div>
                </div>
               </article>
               <SliderHome 
                    data={data}
                    handleSlider={handleSlider}
                    handleCart={handleCart}
                />
               </React.Fragment>
           }
      
           

            return (
                <React.Fragment>
                  {ResultData}
                </React.Fragment>
            )}}
        </FetchConsumer>

    );
   
}

export default ProductoHome

