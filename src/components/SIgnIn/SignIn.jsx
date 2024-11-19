import React, { useState } from 'react';
import './SignIn.css';
import NetflixLogo from '../../assets/Netflix_Logo.png';

const SignIn = ({ onSignIn, onSignUpClick }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignIn(formData);
    };

    return (
        <div className="signin">
            <div className="signin__header">
                <img src={NetflixLogo} alt="Netflix" className="signin__logo" />
            </div>

            <div className="signin__content">
                <div className="signin__form-wrapper">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="signin__input-group">
                            <input
                                type="email"
                                placeholder="Email or phone number"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="signin__input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                        <button type="submit" className="signin__button">Sign In</button>

                        <div className="signin__form-help">
                            <div className="signin__remember">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#">Need help?</a>
                        </div>
                    </form>
                  
<div className="auth-switch">
    <p>New to Netflix?</p>
    <button onClick={onSignUpClick} className="auth-switch-button">
        Sign up now
    </button>
</div>


                    <div className="signin__disclaimer">
                        <p>This is an educational Netflix clone.</p>
                        <p>No actual authentication is performed.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
