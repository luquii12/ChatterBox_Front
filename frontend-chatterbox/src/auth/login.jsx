import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import bcrypt from 'bcryptjs';

// import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    e.preventDefault();
  
    ServicioUsuario.login(usuario)
      .then((response) => {
       if(response.data.length !== 0 ){  
        console.log(response);
        let salt=bcrypt.genSaltSync(10)
        let pss=bcrypt.hashSync("1234",salt)
        ServicioUsuario.guardarUsuario("Juan",pss)

        if( bcrypt.compareSync(password,response.data[0].pass) ){    
        login(response.data[0].nombre);

        console.log("Juan: ",bcrypt.compareSync("123z4","$2a$10$s9PKKjmb.2/I9QLGxCBcAuiyxzg4qAem0.u4/o.RtMMi9Fw49Enlq"));
        
        navigate('/'); 
        }
        else{
          setError("Contraseña no correcta")

        }
       }else {
        
        setError("Usuario no es correcto")
       }
       
        
      })
      .catch((error) => {   
        alert(error)                 
       navigate('/login'); 
      });    
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
