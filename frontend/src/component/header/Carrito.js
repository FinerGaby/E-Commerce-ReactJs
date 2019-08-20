import React, { useState } from 'react';
import { FetchConsumer } from '../../context/FetchContext';


function Carrito()  {

    const [menuDespegable, setMenuDespegable] = useState(false);

    let handleMenu
    handleMenu = () => {
        if(!menuDespegable) {
        setMenuDespegable(true)
    } else {
        setMenuDespegable(false)
    }}

    return (
        <FetchConsumer>
            {(value) => { 

           //accedo a los datos del context
           const { cart } = value;
           //console.log(cart)     

           let ResultData
           if(cart.length === 0) {
               ResultData = <span>no item</span>
           }  else {
            ResultData =
            <React.Fragment>
            {cart.map( (e, i) => {
                //console.log(e.precio)
                return (
                    <div key={e.id}>
                        {e.title} - {e.precio}
                    </div>
                )}
                )}
             </React.Fragment>
           }

            return (
                <React.Fragment>
        <div onClick={() => handleMenu()} className="carrito">
        Carrito <strong>{cart.length}</strong>
        {menuDespegable ? 
            <div className="carrito-sub">{ResultData}</div>
         : null }
        </div>
        <div className="agregar">
                agregar
        </div>
        </React.Fragment>
            )}}
        </FetchConsumer>

    );
   
}

export default Carrito
