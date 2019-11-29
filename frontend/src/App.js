import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import MainHeader from './component/header/MainHeader';
import ContainerMain from './component/pages/home/ContainerMain';
import Tienda from './component/pages/tienda/Tienda';
import ProductoId from './component/pages/tienda/ProductoId';
import CheckCart from './component/pages/tienda/CheckCart';


import FetchProvider from './context/FetchContext';
import CartProvider from './context/CartContext';
import AuthJwtProvider from './context/AuthJwtContext';

import AdminHome from './component/pages/admin/AdminHome';
import AgregarProducto from './component/pages/admin/AgregarProducto';
import CategoriaAdd from './component/pages/admin/CategoriaAdd';
import Registrar from './component/pages/registerlogin/Registrar';
import Login from './component/pages/registerlogin/Login';



function App() {
  return (
    <Router>
    <FetchProvider>
    <AuthJwtProvider>
    <CartProvider>
        <MainHeader />
        <Switch >

        {/* Router Principal */}
        <Route exact path="/" component={ContainerMain}/>
        <Route exact path="/checking" component={CheckCart}/>

        {/* Route Tienda / Producto / Filtrado por categoria del sidebar */}
        <Route exact path="/tienda" component={Tienda}/>
        <Route path="/producto/:id" 
                render={props => 
                <ProductoId id={props.match.params.id} />} />

        <Route exact path="/categoria/:id" 
               render={props => 
                        <Tienda id={props.match.params.id} />} />
        />

        {/* Router Registrar / Login */}
        <Route exact path="/registrarse" component={Registrar} />
        <Route exact path="/login" component={Login} />


        {/* Route Administracion  */}
        <Route exact path="/adminhome" component={AdminHome}/>
        <Route exact path="/agregar" component={AgregarProducto}/>
        <Route exact path="/createcategory" component={CategoriaAdd}/>
        <Route exact path="/editarproducto/:id" 
                render={props => 
                        <AgregarProducto id={props.match.params.id} />} />

        </Switch>
        </CartProvider>
        </AuthJwtProvider>
        </FetchProvider>
    </Router>
  );
}

export default App;
