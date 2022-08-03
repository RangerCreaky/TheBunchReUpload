import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { useDispatch } from 'react-redux';
import Alert from '../layout/Alert';
import { registerAction } from '../../actions/auth';
import { useSelector } from 'react-redux';

const Register = () => {
    const isAuthenticated = useSelector((state) => {
        return state.auth.isAuthenticated;
    });

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // matching the password
        if (password !== password2) {
            dispatch(setAlert('Passwords do not match', 'danger'));
        }
        else {
            // We call an action creator
            dispatch(registerAction({ name, email, password }));
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/bunch-landing" replace />;
    }

    return (
        <>
            <div className="login-wrapper">
                <Alert />
                <div className="login-form-container" id="container">
                    <div className="login-form-inner-container sign-in-container">
                        <form action="#" className="login-form" onSubmit={onSubmit}>
                            <h1 className="login-heading">Sign up</h1>
                            <span className="login-span"><i className="fas fa-user"></i> Create Your Account</span>
                            <input
                                className="login-input"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                            <input
                                className="login-input"
                                placeholder="Email Address"
                                name="email"
                                autoComplete='email'
                                value={email}
                                onChange={onChange}
                                required
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                autoComplete="current-password"
                                value={password}
                                onChange={onChange}
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                minLength="6"
                                autoComplete="current-password"
                                value={password2}
                                onChange={onChange}
                            />
                            <span>Already have an account? <NavLink to="/login">Sign In</NavLink></span>
                            <button className="login-button my-1" type='submit'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>





        </ >
    )
};

export default Register;