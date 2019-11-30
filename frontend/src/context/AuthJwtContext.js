import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthJwtContext = React.createContext();
export const AuthJwtConsumer = AuthJwtContext.Consumer;

const AuthJwtProvider = (props) => {

    const [token, setToken] = useState(null)
    const [auth, setAuth] = useState(false);
    const [dataLog, setDataLog] = useState({
        name: '',
        email: ''
    });

    
    useEffect(() => {
        let fetching = async () => { fetchToken()  }   
     fetching();  
   }, []);
    
    
    let fetchToken = async () => {
        const accessToken = localStorage.getItem('JWT');
        console.log(accessToken)
        if(accessToken == null) {
            //no tenes acceso al log
            setAuth(false)
        } else {
            //busco los datos del token del usuario
            const res = await axios.get('http://localhost:8080/api/registrarse/datosuser', {
              headers: { Authorization: `JWT ${accessToken}` },
              });
              console.log(res)
            const { name, email, auth } = res.data;
            setAuth(auth)
            setDataLog({
              name: name,
              email: email
            })
        }
    }
  

    return (

      <AuthJwtContext.Provider
        value={{
            auth,
            dataLog,
            fetchToken
        }}
      >
       {props.children}
      </AuthJwtContext.Provider>
    );
};

export default AuthJwtProvider;