import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthCodeModal from '../modal/AuthCodeModal';
import axios from 'axios';

import '../index.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    if (name.trim().length < 3 || name.trim().length > 12) {
      setErrorMessage('Name must be between 3 and 12 characters.');
      setSuccessMessage('');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setSuccessMessage('');
      return false;
    }


    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setErrorMessage('Password must be at least 8 characters long, contain an uppercase letter, a number, and special character.');
      setSuccessMessage('');
      return false;
    }

    if (!isChecked) {
      setErrorMessage('You must agree to the Terms and Conditions.');
      setSuccessMessage('');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = { name, email, password, phone };
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
          } else {
            throw error;
          }
        }

        if (!preResponse || !preResponse.data) {
          throw new Error('Pre-registration response data is missing.');
        }

        const preData = preResponse.data;
        setShowMessage(preData.message, false);
        setUserEmail(email); // Ensure the userEmail state is set

        const generate2FAResponse = await axios.post('/2fa/generate', { registration_data: { email } }, {
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
      // Store the token (e.g., in local storage) and navigate to the dashboard
      localStorage.setItem('auth_token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google Sign-In...');
      const response = await axios.get('http://127.0.0.1:8000/api/auth/google');
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
      // Token is present, meaning authentication was successful
      window.location.href = '/dashboard';
    }
  };

  // Run this function after the page loads to check for the token
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
      <header className="flex justify-center items-center bg-white  bg-opacity-90 shadow-md rounded-xl w-[80%] px-3 py-4 sticky top-9 inset-x-0 mx-auto z-50">
        <img src="./images/dashboard.gif" alt="Dashboard icon" className="w-6 h-6 mr-1" />
        <Link to="/dashboard" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer ">Dashboard </Link>
        <img src="./images/profile.gif" alt="Profile icon" className="w-6 h-6 mr-1" />
        <Link to="/profile" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer ">Profile </Link>
        <img src="./images/sign-up.gif" alt="Signup icon" className="w-6 h-6 mr-1 " />
        <Link to="/register" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer ">Sign Up </Link>
        <img src="./images/login.gif" alt="Login icon" className="w-6 h-6 mr-1" />
        <Link to="/login" className="mr-3 text-gray-700 hover:text-gray-800 font-medium cursor-pointer ">Log In</Link>
      </header>

      {/* Main Content */}
      <main className="mt-16 flex items-center justify-center">
        <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
            <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
              style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
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

            <form onSubmit={handleSubmit} className="px-0 pt-6 pb-0">
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 flex gap-4 items-center">
                {/* Custom Dropdown */}
                <div className="relative w-1/3">
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 bg-white border rounded shadow focus:outline-none hover:border-gray-400"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="flex items-center">
                      {selectedCountry?.flag && (
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.name}
                          className="w-5 h-5 mr-2 rounded"
                        />
                      )}
                      {selectedCountry?.code}
                    </span>
                    <span className="text-gray-600">&#9660;</span>
                  </button>
                  {dropdownOpen && countries?.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                      <ul>
                        {/* Sort countries alphabetically by name */}
                        {countries
                          ?.sort((a, b) => a.name.localeCompare(b.name))
                          .map((country) => (
                            <li
                              key={country.code}
                              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
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
                <input
                  className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isChecked}
                    onChange={handleToggleChange}
                  />
                  I agree to the Terms and Conditions
                </label>
              </div>
              <div className="mb-4">
                <button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
                  type="submit"
                >
                  Sign up
                </button>
              </div>

              {errorMessage && (
                <div className="text-red-500 font-medium text-sm">{errorMessage}</div>
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
          />
        )}
      </main>
    </div>
  );
}
