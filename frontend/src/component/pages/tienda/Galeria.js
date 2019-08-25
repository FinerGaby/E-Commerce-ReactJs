import React, { useState } from 'react';

const Galeria = (props) => {

    //estado activo
    const [activeIndex, setActiveIndex] = useState(0);

    const {imagen} = props;

    //para acceder al primer array
    const activeImagen = imagen[activeIndex];

    const divStyleActive = {
        backgroundImage: `url('/img/${activeImagen}.png')`
        };

    return (
        <React.Fragment>
        <div style={divStyleActive} className="imagenes-galeria-active"></div>
        <div className="flex-box">
         {
             imagen.map( (galeria, index) => {
                const divStyle = {
                backgroundImage: `url('/img/${galeria}.png')`
                };
                 return(
                         <div onClick={() => setActiveIndex(index)} 
                             key={galeria} 
                             style={divStyle} 
                             className="imagenes-galeria">
                         </div>
                 )
             }) 
         }
        </div>
        </React.Fragment>
    )
}

export default Galeria
