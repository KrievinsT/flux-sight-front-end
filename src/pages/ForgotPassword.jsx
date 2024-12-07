import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCodeModal from '../modal/AuthCodeModal';
import '../index.css';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '']);
  const [codeError, setCodeError] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [actionType, setActionType] = useState('reset');
  const [userEmail, setUserEmail] = useState('');

  const [menuOpen, setMenuOpen] = useState(false);


  const [sentPassword, setSentPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address!');
      return;
    }

    setEmailError('');

    try {
      // Send reset link email request
      const response = await axios.post('/password/email', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setEmailError('');
        setShowSuccessMessage(true);
        setIsSubmitted(true);
        setUserEmail(email);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred.';
        setEmailError(errorMessage);
      } else {
        setEmailError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character!');
      return false;
    }

    // Check if the new password matches the password sent via email
    if (password !== sentPassword) {
      setPasswordError('Password does not match the one sent to your email.');
      return false;
    }

    return true;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    console.log('Password reset:', password);
    setIsSuccess(true);
    setShowSuccessMessage(true);


    axios.post('/password/reset', { email: userEmail, password })
      .then(response => {
        console.log('Password successfully reset!');
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      })
      .catch(error => {
        console.error('Error resetting password:', error);
      });
  };

  const toggleForm = () => {
    setIsSubmitted(!isSubmitted);
  };

  return (
    <div
      className="min-h-screen max-w-full bg-cover overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./images/register-background.jpg")',
      }}
    >
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


      <main className={`${menuOpen ? 'mt-[10rem]' : 'mt-20'} flex items-center justify-center transition-all duration-200`}>
        <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
          {/* Conditional form rendering */}
          {!isSubmitted ? (
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <div
                className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
                style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
              >
                <h2 className=" 405px:text-3xl text-2xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                  Forgot password?
                </h2>
                <div className="flex justify-center mt-6 mb-3 space-x-4">
                  No worries, we'll send you reset instructions.
                </div>
              </div>
              <form onSubmit={handleSubmit} className="px-0 pt-6 pb-6">
                <div className="mb-4 mt-4">
                  <label className="text-gray-600 font-medium">Email</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <div className="text-red-500 font-medium mt-3">{emailError}</div>}
                </div>
                <div className="mt-6">
                  <button
                    className="w-full mt-5 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
                    type="submit"
                  >
                    Reset password
                  </button>
                </div>
              </form>
              <div className="text-center text-sm font-medium text-gray-600 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="inline-block w-4 h-4 mr-2 mb-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <Link to="/login" className="text-gray-600 font-medium hover:text-gray-800">
                  Back to log in
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <div
                className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
                style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
              >
                <h2 className="text-xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                  Set new password
                </h2>
                {/* Opens mail when clicked */}
                <div className="flex flex-col justify-center items-center mt-6 mb-3 text-white font-medium">
                    <span>Your new password was sent to:</span>
                    <a
                      href="https://mail.google.com/"  
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white mt-1 underline"
                    >
                      {email || "unknown@example.com"}
                    </a>
                  </div>
              </div>
              
              {showSuccessMessage && (
                <div className="bg-green-600 text-white rounded-lg mt-4 shadow-lg p-4 text-center">
                  Password sent successfully to you're email!
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}