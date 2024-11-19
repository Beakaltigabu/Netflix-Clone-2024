import React, { useState } from 'react';
import './SignUp.css';
import NetflixLogo from '../../assets/Netflix_Logo.png';

const SignUp = ({ onBackToSignIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Name validation
        if (formData.name.length < 2) {
            newErrors.name = 'Please enter your name';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate signup success
            onBackToSignIn();
        }
    };

    return (
        <div className="signup">
            <div className="signup__header">
                <img src={NetflixLogo} alt="Netflix" className="signup__logo" />
            </div>

            <div className="signup__content">
                <div className="signup__form-wrapper">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="signup__input-group">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="signup__input-group">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="signup__input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="signup__input-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            />
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>

                        <button type="submit" className="signup__button">Sign Up</button>
                    </form>

                    
<div className="auth-switch">
    <p>Already have an account?</p>
    <button onClick={onBackToSignIn} className="auth-switch-button">
        Sign in now
    </button>
</div>


                    <div className="signup__disclaimer">
                        <p>This is an educational Netflix clone.</p>
                        <p>No actual authentication is performed.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
