import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCodeModal from '../modal/AuthCodeModal';
import '../index.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [code, setCode] = useState(['', '', '', '', '']); 
    const [codeError, setCodeError] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(false); 
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(true);
    const [actionType, setActionType] = useState('reset');
    const [userEmail, setUserEmail] = useState(''); 
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
      setEmailError('');
      setIsSubmitted(true);
      setUserEmail(email); // Set the userEmail state here
      setShowAuthModal(true);
    };

  const handleCodeChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    setCodeError('');
  };

  const validateCode = () => {
    if (code.some((digit) => digit === '')) {
      setCodeError('Please enter the complete code');
      return false;
    }
    setIsCodeValid(true); 
    return true;
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (!validateCode()) {
      return;
    }
    // Handle code submission logic here (e.g., verify code via API)
    console.log('Code submitted:', code.join(''));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character');
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };


  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      return;
    }
    // Handle password reset submission (e.g., make API call)
    console.log('Password reset:', password);
    setIsSuccess(true); 
    setShowSuccessMessage(true); 
     setTimeout(() => {
      navigate('/login');
     }, 4000); 
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

       <main className="mt-20 flex items-center justify-center">
  <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-6 mx-auto">
    {/* Conditional form rendering */}
    {!isSubmitted ? (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <div className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
          <h2 className="text-xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
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
           
            {emailError && <div className="text-red-500 font-medium mt-2">{emailError}</div>}
          </div>

          <div className="mt-6">
            <button
              className="w-full mt-5 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
              type="submit"
            >
              Reset password
            </button>
            {showAuthModal && (
                    <AuthCodeModal
                      email={userEmail} 
                      onClose={() => setShowAuthModal(false)}
                      actionType={actionType}
                    />
                  )}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <Link to="/login" className="text-gray-600 font-medium hover:text-gray-800">
            Back to log in
          </Link>
          

        </div>
      </div>
      
      
    ) : isCodeValid ? (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        
        <div className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
          <h2 className="text-xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
            Set new password
          </h2>
          <div className="flex justify-center mt-6 mb-3 space-x-4">
            Must be at least 8 characters long, contain an uppercase letter, a number, and special character.
          </div>
        </div>
        <form onSubmit={handlePasswordSubmit} className="px-0 pt-6 pb-6">
          <div className="mb-4">
            <label className="text-gray-600 font-medium">New Password</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 font-medium">Confirm Password</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          {passwordError && <div className="text-red-500 font-medium mt-2">{passwordError}</div>}
          {confirmPasswordError && <div className="text-red-500 font-medium mt-2">{confirmPasswordError}</div>}

          <div className="mt-6">
            <button
              className="w-full mt-5 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
              type="submit"
            >
              Set password
            </button>
          </div>
        </form>
        {showSuccessMessage && (
          <div className="w-full max-w-md bg-green-600 text-white rounded-lg shadow-lg p-4 text-center transition-opacity opacity-100 animate-fadeIn">
            <p className="text-sm font-medium">
              Password reset successfully! Redirecting to login page...
            </p>
          </div>
        )}
        <div className="text-center text-sm font-medium text-gray-600 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline-block w-4 h-4 mr-2 mb-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <Link to="/login" className="text-gray-600 font-medium hover:text-gray-800">
            Back to log in
          </Link>
        </div>
      </div>
    ) : null}
  </div>
</main>
    </div>
  );
}
