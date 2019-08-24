import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainHeader from './component/header/MainHeader';
import ContainerMain from './component/pages/home/ContainerMain';
import Tienda from './component/pages/tienda/Tienda';

import FetchProvider from './context/FetchContext';
import CartProvider from './context/CartContext';
import ProductoId from './component/pages/tienda/ProductoId';


function App() {
  return (
    <Router>
    <FetchProvider>
    <CartProvider>
        <MainHeader />
        <Switch >
        <Route exact path="/" component={ContainerMain}/>
        <Route exact path="/tienda" component={Tienda}/>
        <Route path="/tienda/:id" 
                render={props => 
                <ProductoId id={props.match.params.id} />} />
        </Switch>
        </CartProvider>
        </FetchProvider>
    </Router>
  );
}

export default App;
