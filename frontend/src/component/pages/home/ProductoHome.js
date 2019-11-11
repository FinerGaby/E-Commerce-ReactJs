import React, { useState } from 'react';
import { FetchConsumer } from '../../../context/FetchContext';
import { CartConsumer } from '../../../context/CartContext';

import SliderHome from './SliderHome';


const ProductoHome = () => {

    const [activeindex, setActiveindex ] = useState(0);

    return (
        <CartConsumer>
        {(cart) => (
                
        <FetchConsumer>
            {(value) => { 
            
            //accedo los datos de context de cart
            const {handleCart} = cart
          
             //accedo a los datos del context
            const {data, fav} = value;

            //accedo al primer array de la posicion 0 para el carrousel
            const dataSlider = data[activeindex];

           //actualizo el estado segun el index que me llege del array en <SliderHome />
            let handleSlider
            handleSlider = (e) => {
                setActiveindex(e)
            }

            
    

           let MyComponent
           if (data[0] === undefined) {
               MyComponent = <div>no datos</div>
           } else {
            const divStyle = {
                backgroundImage: `url('/img/${dataSlider.imagen[0]}')`
            };
                MyComponent = 
               <React.Fragment>
               <article style={divStyle} className="home-flex">
                <div className="title-descripcion">Just do Shoes<br />
                     <span>Fire Nike</span></div>
                <div className="title-carrito">
                    <div className="title-home">{dataSlider.title}</div>
                    <div className="precio-home">${dataSlider.precio}</div>
                        <div onClick={() => handleCart(dataSlider.id, data)} className="button-add">Add Cart</div>
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
                  {MyComponent}
                </React.Fragment>
            )}}
        </FetchConsumer>
        )}
        </CartConsumer>
    );
}

export default ProductoHome

