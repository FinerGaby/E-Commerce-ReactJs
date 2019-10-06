import React from 'react';
import { Link } from 'react-router-dom';
import { FetchConsumer } from '../../../context/FetchContext';
import { CartConsumer } from '../../../context/CartContext';
import SidebarCat from './SidebarCat';



function Tienda(props) {

    return (

        <CartConsumer>
            {(cart) => (

          <FetchConsumer>
            {(value) => { 

                //accedo a el estado de cart
                const { handleCart } = cart;

                //accedo a el estado del context
                const { data } = value;

                let MyComponent
                if( data.lenght === 0) {
                    MyComponent = <div>no datos</div>
                } else {
                    if( props.id ) {
                        MyComponent = 
                        <React.Fragment>
                            <div className="productos">
                            {
                                data.filter(e => e.categoria === props.id).map( (e, i) => {
                            const divStyle = {
                             backgroundImage: `url('/img/${e.imagen[0]}.jpg')`
                             };
                               return (
                                  
                                    <div key={e.id} className="productos-map">
                                    <div style={divStyle} className="imagen-productos"></div><br />
                                    <Link to={`/producto/${e.id}`}>{e.title}</Link><br />
                                    ${e.precio}
                                    <div onClick={() => handleCart(e.id, data)} className="button-add-tienda">Add Cart</div>
                                    </div>
                                    
                            )})
                                }
                            </div>
                        </React.Fragment>
                    } else  {
                        MyComponent =
                    <React.Fragment>
                    <div className="productos">
                        {
                            data.map( (e, i) => {
                            const divStyle = {
                             backgroundImage: `url('/img/${e.imagen[0]}.jpg')`
                             };
                               return (
                                  
                                    <div key={e.id} className="productos-map">
                                    <div style={divStyle} className="imagen-productos"></div><br />
                                    <Link to={`/producto/${e.id}`}>{e.title}</Link><br />
                                    ${e.precio}
                                    <div onClick={() => handleCart(e.id, data)} className="button-add-tienda">Add Cart</div>
                                    </div>
                                    
                            )})

                        }
                    </div>
                    </React.Fragment>
                    }
                }
            
            return (
                <div className="container-tienda">
                <div className="container-tienda-flex">
                    <SidebarCat />
                    <div className="productos-tienda">
                    <div className="buscador-productos">
                        <span>Busca el producto que quieras!</span><br />
                        <input type="search" name="search" className="search-producto" />
                    </div>
                     {MyComponent}
                     </div>
                     </div>
                </div>
            )}}
          </FetchConsumer>
            )}
          </CartConsumer>
    )
}

export default Tienda
