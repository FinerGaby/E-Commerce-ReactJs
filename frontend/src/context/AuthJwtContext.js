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
    const [noLog, setNoLog] = useState(false);

    useEffect(() => {
        let fetching = async () => { fetchToken()  }   
     fetching();  
   }, []);
    
    
    let fetchToken = async () => {
        const accessToken = localStorage.getItem('JWT');
        console.log(accessToken)
        if(accessToken == null) {
            //no tenes acceso al log
            setNoLog(true)
        } else {
            //busco los datos del token del usuario
            const res = await axios.get('http://localhost:8080/api/regitrarse/datosuser', {
                params: {},
                headers: { Authorization: `JWT ${accessToken}` },
              });
          
            console.log(res)
        }
    }
  

    return (

      <AuthJwtContext.Provider
        value={{
            noLog
        }}
      >
       {props.children}
      </AuthJwtContext.Provider>
    );
};

export default AuthJwtProvider;