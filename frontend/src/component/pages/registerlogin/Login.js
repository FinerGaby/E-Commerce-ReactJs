import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
   
    const [dataUser, setDataUser] = useState({
        name: '',
        password: ''
    });

    let handleChange
    handleChange = (e) =>  {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        }) 
    }

    let handleSubmit
    handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:8080/api/registrarse/login`, dataUser)
        console.log(res)
       console.log(res.data.message)
       localStorage.setItem('JWT', res.data.token);

    }



    return (
        <div className="container-fluid">
        <form onSubmit={handleSubmit}>
                        <label id="idtest" htmlFor="idtest">Nombre de usuario:</label>
                        <input type="text" placeholder="Nombre de usuario" name="name" onChange={handleChange} /><br />
                        <label id="idtest" htmlFor="idtest">Contraseña:</label>
                        <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
                        <br />
                        <input type="submit" value="Crear" />
                 </form>
        </div>
    )
}

export default Login
