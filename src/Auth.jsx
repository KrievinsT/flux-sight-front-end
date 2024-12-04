import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const withAuth = (Component) => {
  return () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
      const updateSessionStorage = (key) => {
        const sessionValue = sessionStorage.getItem(key);
        const localValue = localStorage.getItem(key);
        if (!sessionValue && localValue) {
          sessionStorage.setItem(key, localValue);
        }
      };

      ['id', 'token', 'user', 'username'].forEach(updateSessionStorage);

      const allowedPaths = ['/register', '/forgotpassword', '/forgot_password'];
      const queryParams = new URLSearchParams(location.search);
      const emailToken = location.pathname.split('/')[2];
      const email = queryParams.get('email');

      const id = sessionStorage.getItem('id');
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user');
      const username = sessionStorage.getItem('username');

      console.log('Location Pathname:', location.pathname);
      console.log('Email Token:', emailToken);
      console.log('Email:', email);
      console.log('Session Storage:', { id, token, user, username });

      if (location.pathname.startsWith('/forgot_password') && emailToken && email) {
        axios.post('/check-password-reset-token', { email, token: emailToken })
          .then(response => {
            if (response.data.valid) {
              console.log('Token is valid');
              setIsValidToken(true);
            } else {
              console.log('Invalid token');
              setIsValidToken(false);
              navigate('/login');
            }
          })
          .catch(error => {
            console.log('Error checking token', error);
            setIsValidToken(false);
            navigate('/login');
          });

        return;
      }

      if (!(id && token && user) && !allowedPaths.includes(location.pathname)) {
        console.log('Redirecting to /login');
        navigate('/login');
      }
    }, [navigate, location.pathname, location.search]);

    return <Component />;
  };
};

export default withAuth;
