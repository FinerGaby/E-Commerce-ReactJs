import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import MainHeader from './component/header/MainHeader';
import ContainerMain from './component/pages/home/ContainerMain';
import Tienda from './component/pages/tienda/Tienda';
import ProductoId from './component/pages/tienda/ProductoId';
import CheckCart from './component/pages/tienda/CheckCart';


import FetchProvider from './context/FetchContext';
import CartProvider from './context/CartContext';
import AdminHome from './component/pages/admin/AdminHome';
import AgregarProducto from './component/pages/admin/AgregarProducto';
import CategoriaAdd from './component/pages/admin/CategoriaAdd';



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
        <Route path="/producto/:id" 
                render={props => 
                <ProductoId id={props.match.params.id} />} />

        <Route exact path="/categoria/:id" 
               render={props => 
                        <Tienda id={props.match.params.id} />} />
        />

        <Route exact path="/adminhome" component={AdminHome}/>
        <Route exact path="/agregar" component={AgregarProducto}/>
        <Route exact path="/createcategory" component={CategoriaAdd}/>
        <Route exact path="/editarproducto/:id" 
                render={props => 
                        <AgregarProducto id={props.match.params.id} />} />

        </Switch>
        </CartProvider>
        </FetchProvider>
    </Router>
  );
}

export default App;
