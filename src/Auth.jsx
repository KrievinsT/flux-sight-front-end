import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const withAuth = (Component) => {
  return () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const updateSessionStorage = (key) => {
        const sessionValue = sessionStorage.getItem(key);
        const localValue = localStorage.getItem(key);
        if (!sessionValue && localValue) {
          sessionStorage.setItem(key, localValue);
        }
      };

      ['id', 'token', 'user', 'username'].forEach(updateSessionStorage);

      const allowedPaths = ['/register', '/forgotpassword'];
      const id = sessionStorage.getItem('id');
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user');
      const username = sessionStorage.getItem('username');

      if (!(id && token && user && username) && !allowedPaths.includes(location.pathname)) {
        navigate('/login');
      }
    }, [navigate, location.pathname]);

    return <Component />;
  };
};

export default withAuth;
