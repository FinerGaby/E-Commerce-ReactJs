import React from 'react';
import { Link } from 'react-router-dom';
import Carrito from './Carrito';
import { AuthJwtConsumer } from '../../context/AuthJwtContext';


function MainHeader() {

    return (
        <AuthJwtConsumer>
            {(value) => { 
            
                const {auth, dataLog, fetchToken} = value

    let handleSubmit
    handleSubmit = () => {
        localStorage.clear();
        fetchToken()
    }

    return (
        <header className="header">
        <div className="logo"><Link to={"/"}>NIKE</Link></div>
            <nav className="menu">
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/tienda"}>Tienda</Link></li>
                    <li><Link to={"/empresa"}>Leeme</Link></li>
                    <li><Link to={"/contacto"}>Contacto</Link></li>
                </ul>
                <ul class="sign-out">
                   
                    {auth ? 
                        <React.Fragment>
                        <li>{dataLog.name}</li> 
                        <li onClick={handleSubmit}>Logout</li>
                        </React.Fragment>
                        :  
                        <React.Fragment>
                        <li><Link to={"/login"}>Login</Link></li>
                        <li><Link to={"/registrarse"}>Registrarse</Link></li>
                        </React.Fragment> 
                    }
                   
                </ul>
            </nav>
            <Carrito /> 
        { auth ? 
        <React.Fragment>
        <div className="agregar">
                     <Link to={"/adminhome"}>
                     <i className="material-icons">
                        perm_identity
                        </i>
                     </Link>
                </div>
                </React.Fragment>
                : null }
        </header>
        )}}
        </AuthJwtConsumer>
    )
}

export default MainHeader
