import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import MainHeader from './component/header/MainHeader';
import ContainerMain from './component/pages/home/ContainerMain';
import Tienda from './component/pages/tienda/Tienda';
import ProductoId from './component/pages/tienda/ProductoId';
import CheckCart from './component/pages/tienda/CheckCart';


import FetchProvider from './context/FetchContext';
import CartProvider from './context/CartContext';
import SidebarAdmin from './component/pages/admin/SidebarAdmin';


function App() {
  return (
    <Router>
    <FetchProvider>
    <CartProvider>
        <MainHeader />
        <Switch >
        <Route exact path="/" component={ContainerMain}/>
        <Route exact path="/tienda" component={Tienda}/>
        <Route exact path="/checking" component={CheckCart}/>
        <Route exact path="/adminhome" component={SidebarAdmin}/>
        <Route path="/producto/:id" 
                render={props => 
                <ProductoId id={props.match.params.id} />} />
        </Switch>
        </CartProvider>
        </FetchProvider>
    </Router>
  );
}

export default App;
