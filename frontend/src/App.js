import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainHeader from './component/header/MainHeader';
import ContainerMain from './component/pages/home/ContainerMain';
import Tienda from './component/pages/tienda/Tienda';

import FetchProvider from './context/FetchContext';
import CartProvider from './context/CartContext';


function App() {
  return (
    <Router>
    <FetchProvider>
    <CartProvider>
        <MainHeader />
        <Switch >
        <Route exact path="/" component={ContainerMain}/>
        <Route path="/tienda" component={Tienda}/>
        </Switch>
        </CartProvider>
        </FetchProvider>
    </Router>
  );
}

export default App;
