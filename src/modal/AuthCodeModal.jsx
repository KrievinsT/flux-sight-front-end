import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthCodeModal({ email, onClose }) {
    const [code, setCode] = useState(Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (index < 5) document.getElementById(`input-${index + 1}`).focus();
        } else if (value === '') {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
        }
    };

    const handleSubmit = () => {
        const enteredCode = code.join('');
        handleAuthSubmit(enteredCode);
    };

    const handleAuthSubmit = async (enteredCode) => {
        try {
            const token = localStorage.getItem('twoFactorToken');
            console.log('Submitting 2FA code:', enteredCode);
            console.log('Using token:', token);
    
            if (!token) {
                throw new Error('Token not found in local storage.');
            }
    
            const response = await axios.post('/2fa/verify', { two_factor_code: enteredCode, token }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('2FA verification response:', response);
    
            if (response.data.message === '2FA verified successfully.') {
                setSuccessMessage('2FA verification successful! Registering your account...');
    
                // Call the /register endpoint
                const formData = JSON.parse(localStorage.getItem('register'));
                console.log('Submitting registration data:', formData);
    
                const registerResponse = await axios.post('/register', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                console.log('Registration response:', registerResponse);
    
                if (registerResponse.data.message === 'User registered successfully.') {
                    setSuccessMessage('Registration successful! Redirecting to dashboard...');
                    setErrorMessage('');
    
                    setTimeout(() => {
                        onClose();
                        navigate('/dashboard');
                    }, 3000);
                } else {
                    throw new Error(registerResponse.data.message);
                }
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error verifying 2FA code or registering:', error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data.message : error.message);
            setSuccessMessage('');
        }
    };
    

    const handleClearCode = () => {
        setCode(Array(6).fill('')); 
        setErrorMessage(''); 
        setSuccessMessage(''); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-[520px] w-full shadow-lg text-center relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl font-medium text-gray-700 hover:text-gray-700">
                    ✕
                </button>
                <div className="flex justify-center mb-4">
                    <img src="./images/auth.png" alt="Auth logo" className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Authenticate Your Account</h2>
                <p className="text-gray-600 mb-6">
                    Protecting your tickets is our top priority. Please confirm your account by entering the authorization code sent to {email}.
                </p>
                <div className="flex justify-center gap-2 mb-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`input-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    ))}
                </div>
                <div className="flex justify-center gap-2 mb-2 ">
                <button
                    onClick={handleClearCode}
                    className="bg-gray-300 text-black py-1 px-4 mt-2 rounded-md font-medium hover:bg-gray-400 focus:outline-none"
                >
                    Clear
                </button>
                </div>
                {errorMessage && <p className="text-red-500 mb-0">{errorMessage}</p>}
                {successMessage && <p className=" text-sm font-mediumw-full mt-3 max-w-md bg-green-600 text-white rounded-lg shadow-lg p-4 text-center  transition-opacity opacity-100 animate-fadeIn">{successMessage}</p>}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white py-2 px-4 mt-5 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
                <p className="text-sm text-gray-500 mt-4">
                    It may take a minute to receive your code. Haven’t received it?{' '}
                    <button className="text-blue-600 hover:underline focus:outline-none">Resend a new code.</button>
                </p>
            </div>
        </div>
    );
}
