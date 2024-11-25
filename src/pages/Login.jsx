import React, { useState } from 'react';
import '../index.css';
import AuthCodeModal from '../modal/AuthCodeModal';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [userEmail, setUserEmail] = useState(''); 
    const navigate = useNavigate();

    const handleToggleChange = () => {
        setIsChecked(!isChecked);
    };
  
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
    
      // for testing i commented out 

      try {
          // Simulated login success for testing purposes
          // const response = await fetch('https://your-api-endpoint.com/api/login', {
          //     method: 'POST',
          //     headers: {
          //         'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //         email,
          //         password,
          //     }),
          // });
    
          // Simulated response to show authentication modal
          // if (response.ok) {
              // const data = await response.json();
              // if (data.success) {
                  
                  setUserEmail(email); // Set userEmail to the entered email
                  setErrorMessage('');
                  setShowAuthModal(true); // Show the authentication modal upon success
              // } else {
              //     setErrorMessage(data.message || 'Invalid credentials');
              //     setSuccessMessage('');
              // }
          // } else {
          //     setErrorMessage('Error logging in. Please try again.');
          //     setSuccessMessage('');
          // }
      } catch (error) {
          setErrorMessage('Server error. Please try again later.');
          setSuccessMessage('');
      }
  };

   

    return (
        <div 
          className="min-h-screen max-w-full bg-cover overflow-hidden" 
          style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./images/register-background.jpg")' }}
        >
          {/* Header */}
          <header className="flex justify-center items-center bg-white bg-opacity-90 shadow-md rounded-xl w-[80%] px-3 py-4 sticky top-9 inset-x-0 mx-auto z-50">
        
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
          <main className="mt-20 flex items-center justify-center">
            <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
                <div 
                  className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6" 
                  style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
                >
                  <h2 className="text-xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                    Log in
                  </h2>
                  <div className="flex justify-center mt-6 mb-3 space-x-4">
                    <button className="flex items-center bg-white text-gray-900 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">
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
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                          className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${
                            isChecked ? 'bg-gray-700' : 'bg-gray-400'
                          }`}
                        />
                        <div
                          className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                            isChecked ? 'transform translate-x-5' : ''
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
                email={userEmail} // pass userEmail as a prop
                onClose={() => setShowAuthModal(false)} 
                
              />
            )}
          </main>
        </div>
    );
}
