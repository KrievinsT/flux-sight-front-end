import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthCodeModal from '../modal/AuthCodeModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [actionType, setActionType] = useState('');
  const [save, setSave] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setSave(true);
    }

  }

  const validateForm = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setSuccessMessage('');
      return false;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.'
      );
      setSuccessMessage('');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = { login: email, password };
      localStorage.setItem('login', JSON.stringify(formData));
      console.log('Stored data for login:', formData);

      let preResponse;
      try {
        preResponse = await axios.post('/pre-login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Pre-login response:', preResponse);
      } catch (error) {
        if (error.response && error.response.status === 419) {
          console.log('CSRF token expired, refreshing token...');
          preResponse = await axios.post('/pre-login', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else if (error.response && error.response.status === 401) {
          setErrorMessage('Invalid email or password. Please try again.');
          setSuccessMessage('');
          return;
        } else {
          throw error;
        }
      }

      if (!preResponse || !preResponse.data) {
        throw new Error('Pre-login response data is missing.');
      }

      const preData = preResponse.data;
      if (preData.error) {
        setErrorMessage(preData.error);
        setSuccessMessage('');
        return;
      }

      setShowMessage(preData.message, false);
      setUserEmail(email);

      const generate2FAResponse = await axios.post('/2fa/generate', { login_data: formData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!generate2FAResponse || !generate2FAResponse.data) {
        throw new Error('2FA generation response data is missing.');
      }

      const generate2FAData = generate2FAResponse.data;
      localStorage.setItem('twoFactorCode', generate2FAData.twoFactorCode);
      localStorage.setItem('twoFactorToken', generate2FAData.token);
      setShowMessage(generate2FAData.message, false);

      setActionType('login');
      setShowAuthModal(true);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        console.error('Error in pre-login or 2FA flow:', error.response ? error.response.data : error.message);
        setErrorMessage('An error occurred. Please try again later.');
      }
      setSuccessMessage('');
    }
  };


  const handleVerifyLogin = async (authCode) => {
    try {
      const response = await axios.post('/login', {
        email,
        password,
        authCode,
        token: authToken,
      });

      if (response.status === 200) {
        const { token } = response.data;
        setErrorMessage('');
        setSuccessMessage('Login successful!');
        navigate('/dashboard');
        localStorage.setItem('token', token);
      } else {
        setErrorMessage('Invalid 2FA code.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Server error. Please try again later.');
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    const checkForTokenAndRedirect = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const id = urlParams.get('id');
      const name = urlParams.get('name');

      if (token) {
        // Store the token and user details in local storage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('user', name);
        // Redirect to your dashboard
        navigate('/dashboard');
      } else {
        console.error('No token found in the URL');
      }
    };

    checkForTokenAndRedirect();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google Sign-In...');
      const response = await axios.get('/auth/google');
      const { url } = response.data;
      console.log('Google Sign-In URL:', url);
      window.location.href = url;
    } catch (error) {
      console.error('Error with Google Sign-In:', error);
    }
  };

  return (
    <div
      className="min-h-screen max-w-full bg-cover overflow-hidden"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./images/register-background.jpg")' }}
    >
      {/* Header */}
      <header className="flex justify-start block 441px:justify-center items-center bg-white  bg-opacity-90 shadow-md rounded-xl w-[80%] px-3 py-4 sticky top-9 inset-x-0 mx-auto z-50">
        <img src="./images/dashboard.gif" alt="Dashboard icon" className="w-6 h-6 mr-1 hidden 441px:block" />
        <Link to="/landing" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer  hidden 441px:block ">Landing page</Link>
        <img src="./images/sign-up.gif" alt="Signup icon" className="w-6 h-6 mr-1  hidden 441px:block " />
        <Link to="/register" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer  hidden 441px:block">Sign Up </Link>
        <img src="./images/login.gif" alt="Login icon" className="w-6 h-6 mr-1  hidden 441px:block" />
        <Link to="/login" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer  hidden 441px:block ">Log In</Link>

        <div className="flex block 441px:hidden items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className={`absolute top-[3.9rem] left-0 right-0 bg-white bg-opacity-90 rounded-b-xl z-50 pb-3 ${menuOpen ? 'block' : 'hidden '} `}>
          <div className="flex flex-col sm:flex-row items-start space-y-3 space-x-2 block 441px:hidden ">
            <div className="flex items-start space-x-2 pl-2">
              <img src="./images/dashboard.gif" alt="Dashboard icon" className="w-6 h-6" />
              <Link to="/landing" className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
                Landing page
              </Link>
            </div>

            <div className="flex items-start space-x-2">
              <img src="./images/sign-up.gif" alt="Signup icon" className="w-6 h-6" />
              <Link to="/register" className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
                Sign Up
              </Link>
            </div>

            <div className="flex items-start space-x-2">
              <img src="./images/login.gif" alt="Login icon" className="w-6 h-6" />
              <Link to="/login" className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${menuOpen ? 'mt-[10rem]' : 'mt-20'} flex items-center justify-center transition-all duration-200`}>
        <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
          <div className="w-full max-w-[40rem] bg-white rounded-lg shadow-lg p-6 relative">
            <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
              style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
            >
              <h2 className="text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                Log in
              </h2>
              <div className="flex justify-center mt-6 mb-3 space-x-4">
                <button
                  className="flex items-center bg-white text-gray-900 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500"
                  onClick={handleGoogleSignIn}>
                  <img src="./images/google.png" alt="Google logo" className="w-6 h-6 mr-3" />
                  <span className="font-medium text-gray-700">Log in with Google</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-0 pt-6 pb-6 ">
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-start">
                <span className=" cursor-pointer text-sm text-gray-700 hover:text-gray-800 mb-3 font-medium">
                  <Link to="/forgotpassword">Forgot your password? </Link>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={handleToggleChange}
                  />
                  <div className="relative">
                    <div
                      className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${isChecked ? 'bg-gray-700' : 'bg-gray-400'
                        }`}
                    />
                    <div
                      className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${isChecked ? 'transform translate-x-5' : ''
                        }`}
                    />
                  </div>
                  <span className="ml-3 text-sm text-gray-700 font-medium">
                    Remember me
                  </span>
                </label>
              </div>

              <div className="mt-6">
                <button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>

            {/* Error and Success Messages */}
            {errorMessage && (
              <div className="text-red-500 font-medium text-sm ">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="text-green-500 font-medium text-sm">
                {successMessage}
              </div>
            )}

            <div className="text-center text-sm font-medium text-gray-600 mt-4">
              Don’t have an account?
              <Link to="/register" className=" text-sm text-blue-500 hover:text-blue-700 ml-2">Sign up</Link>
            </div>
          </div>
        </div>
        {showAuthModal && (
          <AuthCodeModal
            email={userEmail}
            onClose={() => setShowAuthModal(false)}
            onVerify={handleVerifyLogin}
            actionType={actionType}
            save={save}
          />
        )}
      </main>
    </div>
  );
}
