import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthCodeModal from '../modal/AuthCodeModal';
import axios from 'axios';
import DOMPurify from 'dompurify';

import '../index.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [actionType, setActionType] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (id) {
      navigate(`/dashboard`);
    }
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch country data.");
        const data = await response.json();

        const formattedCountries = data
          .map(country => ({
            name: country.name.common,
            code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            flag: country.flags.svg,
          }))
          .filter(country => country.code);

        setCountries(formattedCountries);
        setSelectedCountry(formattedCountries[0]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    const sanitizedName = DOMPurify.sanitize(name.trim());
    const sanitizedEmail = DOMPurify.sanitize(email.trim());
    const sanitizedPassword = DOMPurify.sanitize(password.trim());
    const sanitizedPhone = DOMPurify.sanitize(phone.trim());
    const sanitizedUsername = DOMPurify.sanitize(username.trim());

    if (!/^[a-zA-Z\s]{3,}$/.test(sanitizedName)) {
      setErrorMessage("Name must be at least 3 characters long and only contain letters and spaces.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (!/^[a-zA-Z\s]{2,}$/.test(sanitizedUsername)) {
      setErrorMessage("Username must be at least 2 characters long.");
      return false;
    }

    if (!/^\d{7,15}$/.test(sanitizedPhone)) {
      setErrorMessage("Phone number must contain only digits and be 7-15 characters long.");
      return false;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(sanitizedPassword)) {
      setErrorMessage("Password must be 8-20 characters long, contain an uppercase letter, a number, and a special character.");
      return false;
    }

    if (!isChecked) {
      setErrorMessage("You must agree to the Terms and Conditions.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const fullPhoneNumber = countryCode + phone;
      console.log("Submitting form with phone number:", fullPhoneNumber);

      try {
        const formData = { name, email, username, password, phone: fullPhoneNumber };
        localStorage.setItem('register', JSON.stringify(formData));
        console.log('Stored data for register:', formData);

        let preResponse;
        try {
          preResponse = await axios.post('/pre-register', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Pre-register response:', preResponse);
        } catch (error) {
          if (error.response && error.response.status === 419) {
            console.log('CSRF token expired, refreshing token...');
            preResponse = await axios.post('/pre-register', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } else if (error.response && error.response.status === 400) {

            const errorData = error.response.data;
            if (errorData && errorData.errors) {

              const errorMessages = Array.isArray(errorData.errors)
                ? errorData.errors
                : Object.values(errorData.errors).flat();

              setErrorMessage(errorMessages); 
              setSuccessMessage('');
              return;
            }
          }
        }

        if (!preResponse || !preResponse.data) {
          throw new Error('Pre-registration response data is missing.');
        }

        const preData = preResponse.data;
        setShowMessage(preData.message, false);
        setUserEmail(email);

        const generate2FAResponse = await axios.post('/2fa/generate', { registration_data: formData }, {
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

        setActionType('register'); // Set the action type to 'register'
        setShowAuthModal(true); // Show the modal

      } catch (error) {
        console.error('Error in pre-register or 2FA flow:', error.response ? error.response.data : error.message);
        setErrorMessage('An error occurred. Please try again later.');
        setSuccessMessage('');
      }
    }
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
    
      localStorage.setItem('auth_token', token);
      navigate('/dashboard');
    }
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

  const checkForTokenAndRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store the token in local storage
      localStorage.setItem('auth_token', token);
      // Redirect to your dashboard
      window.location.href = '/dashboard';
    } else {
      console.error('No token found in the URL');
    }
  };

  window.onload = checkForTokenAndRedirect;

  return (
    <div
      className="min-h-screen max-w-full bg-cover overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./images/register-background.jpg")',
      }}
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
      <main className={`${menuOpen ? 'mt-[10rem]' : 'mt-16'} flex items-center justify-center transition-all duration-200`}>
        <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
          <div className="w-full max-w-[40rem] bg-white rounded-lg shadow-lg p-6 relative">
            <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
              style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
            >
              <h2 className="text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                Sign up
              </h2>
              <div className="flex justify-center mt-6 mb-3 space-x-4">
                <button
                  className="flex items-center bg-white text-gray-900 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500"
                  onClick={handleGoogleSignIn}>
                  <img src="./images/google.png" alt="Google logo" className="w-6 h-6 mr-3" />
                  <span className="font-medium text-gray-700">Sign up with Google</span>
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !dropdownOpen) {
                  handleSubmit(e);
                }
              }}
              className="px-0 pt-6 pb-0"
            >
              <div className="mb-4">
              <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter Name & Surname"
                  value={name}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const capitalizedValue = inputValue
                      .replace(/\s+/g, ' ') 
                      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()); 

                    setName(capitalizedValue);
                  }}
                />
              </div>
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
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\s+/g, ''); 
                    const capitalizedValue = inputValue.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()); 

                    setUsername(capitalizedValue);
                  }}
                />
              </div>
              <div className="mb-4 flex flex-col 441px:flex-row gap-4 items-center">
                {/* Country Dropdown */}
                <div className="relative w-full sm:w-[45%]">
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 bg-white border rounded shadow focus:outline-none hover:border-gray-400"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(!dropdownOpen);
                    }}
                    type="button" 
                  >
                    <span className="flex items-center">
                      {selectedCountry?.flag && (
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.name}
                          className="w-5 h-5 mr-2 rounded"
                        />
                      )}
                      {selectedCountry?.code || 'Select Country'}
                    </span>
                    <span className="text-gray-600">&#9660;</span>
                  </button>
                  {dropdownOpen && countries?.length > 0 && (
                    <div
                      className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
                      role="listbox"
                    >
                      <ul>
                        {countries
                          ?.sort((a, b) => a.name.localeCompare(b.name))
                          .map((country) => (
                            <li
                              key={country.code}
                              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                              role="option"
                              onClick={() => {
                                setCountryCode(country.code);
                                setSelectedCountry(country);
                                setDropdownOpen(false);
                              }}
                            >
                              <span className="flex items-center">
                                {country?.flag && (
                                  <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="w-5 h-5 mr-2 rounded"
                                  />
                                )}
                                {country.name}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  className="shadow appearance-none border rounded w-full sm:w-2/3 py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
              <div className="mb-4">
              <label className="flex items-center flex-wrap">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isChecked}
                    onChange={handleToggleChange}
                  />
                  I agree to the{' '}
                  <span className="pl-1 font-bold text-black cursor-pointer whitespace-normal">
                    Terms and Conditions
                  </span>
                </label>
              </div>
              <div className="mb-4">
                <button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              {/* NORMAL VALDIATION */}
              {errorMessage && (
                <div className="text-red-500 font-medium text-sm">
                  {Array.isArray(errorMessage) ? (
                    errorMessage.map((msg, index) => (
                      <div key={index} className="mb-1">{msg}</div>
                    ))
                  ) : (
                    <div>{errorMessage}</div>
                  )}
                </div>
              )}

              {successMessage && (
                <div className="text-green-500 font-medium text-sm">{successMessage}</div>
              )}
            </form>
            <div className="text-center text-sm font-medium text-gray-600 mt-4">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-2">
                Log in
              </Link>
            </div>
          </div>
        </div>
        {showAuthModal && (
          <AuthCodeModal
            email={userEmail}
            onClose={() => setShowAuthModal(false)}
            actionType={actionType}
          />
        )}
      </main>
    </div>
  );
}
