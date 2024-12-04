import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function Forgot_password() {
  const { token } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromURL = queryParams.get('email');

  const [email, setEmail] = useState(emailFromURL || '');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (token && emailFromURL) {
      setEmail(emailFromURL);
    }
  }, [token, emailFromURL]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
    setPasswordError('');
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character');
      return false;
    }

    if (password !== passwordConfirmation) {
      setPasswordError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await axios.post('/password/reset', { email, password, password_confirmation: passwordConfirmation, token }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setPasswordError(error.response ? error.response.data.message : 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <div
    className="min-h-screen max-w-full bg-cover overflow-hidden"
    style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/images/register-background.jpg")' }}
  >
     <header className="flex justify-start block 441px:justify-center items-center bg-white  bg-opacity-90 shadow-md rounded-xl w-[80%] px-3 py-4 sticky top-9 inset-x-0 mx-auto z-50">
        <img src="/images/dashboard.gif" alt="Dashboard icon" className="w-6 h-6 mr-1 hidden 441px:block" />
        <Link to="/landing" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer  hidden 441px:block ">Landing page</Link>
        <img src="/images/sign-up.gif" alt="Signup icon" className="w-6 h-6 mr-1  hidden 441px:block " />
        <Link to="/register" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer  hidden 441px:block">Sign Up </Link>
        <img src="/images/login.gif" alt="Login icon" className="w-6 h-6 mr-1  hidden 441px:block" />
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
              <img src="/images/dashboard.gif" alt="Dashboard icon" className="w-6 h-6" />
              <Link to="/landing" className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
                Landing page
              </Link>
            </div>

            <div className="flex items-start space-x-2">
              <img src="/images/sign-up.gif" alt="Signup icon" className="w-6 h-6" />
              <Link to="/register" className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
                Sign Up
              </Link>
            </div>

            <div className="flex items-start space-x-2">
              <img src="/images/login.gif" alt="Login icon" className="w-6 h-6" />
              <Link to="/login" className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className={`${menuOpen ? 'mt-[10rem]' : 'mt-20'} flex items-center justify-center transition-all duration-200`}>
        <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
          {/* Conditional form rendering */}
          {!isSuccess ? (
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <div
                className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
                style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
              >
                <h2 className="text-xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                  Reset Password
                </h2>
                <div className="flex justify-center mt-6 mb-3 space-x-4">
                 Enter you're new password here.
                </div>
              </div>
              <form onSubmit={handlePasswordSubmit} className="px-0 pt-6 pb-6">
                <div className="mb-4 mt-4">
                  <label className="text-gray-600 font-medium">New Password</label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                    placeholder="New Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mb-4 mt-4">
                  <label className="text-gray-600 font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                    placeholder="Confirm New Password"
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmationChange}
                  />
                  {passwordError && <div className="text-red-500 font-medium mt-2">{passwordError}</div>}
                </div>
                <div className="mt-6">
                  <button
                    className="w-full mt-5 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <div
                className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
                style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
              >
                <h2 className="text-xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                  Password Reset Successful
                </h2>
                <div className="flex flex-col justify-center items-center mt-6 mb-3 text-white font-medium">
                  <span>Your password has been reset.</span>
                  <span className="font-bold text-white mt-1">{email}</span>
                </div>
              </div>
              <div className="bg-green-600 text-white rounded-lg shadow-lg p-4 mt-6  text-center">
                Password reset successfully! Redirecting to login...
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
