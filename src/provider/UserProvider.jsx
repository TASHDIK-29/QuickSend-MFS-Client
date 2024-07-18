// src/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const axiosPublic = useAxiosPublic();
  
  
//   useEffect(() => {
    
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.get('/profile', {
//         headers: { 'Authorization': token }
//       })
//       .then(response => setUser(response.data))
//       .catch(() => setUser(null));
//     }
//   }, []);

  const login = async (emailOrNumber, pin) => {
    const response = await axiosPublic.post('/login', { emailOrNumber, pin });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('type', response.data.type);
    localStorage.setItem('credential', emailOrNumber);
    // setUser({ credential: emailOrNumber });

    console.log(response.data);
    

    return response.data;
    
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('credential');
    localStorage.removeItem('type');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
