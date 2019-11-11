import React from 'react'


function SliderHome({data, handleSlider, handleCart}) {

    return (
      
                <section className="slider">
                {data.map( (e, i) => {
                const divStyle = {
                backgroundImage: `url('/img/${e.imagen[0]}')`  
                }
                return (
                        <article 
                        onClick={() => handleSlider(i)}
                        key={e.id}  style={divStyle} className="slider-home">
                            <div className="carrousel-component">
                                
                                <div className="el-texto">
                                    {e.title}<br />
                                    <strong>${e.precio}</strong><br />
                                    <div onClick={() => handleCart(e.id, data)} className="add-cart-slider">add</div>
                                </div>
                            </div>
                        </article>
      
                )}
                )
                }
                </section>
    )   
}

export default SliderHome
