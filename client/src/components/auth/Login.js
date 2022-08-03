import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUserAction, loginAction } from '../../actions/auth';
import { useSelector } from 'react-redux';
import Alert from '../layout/Alert';
import { loadBunchAction } from '../../actions/bunch';

const Login = () => {
    // If the user is already logged in
    // Then He must be redirected to some other component
    const isAuthenticated = useSelector((state) => {
        return state?.auth?.isAuthenticated;
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("calling load user");
        dispatch(loadUserAction());
    }, [dispatch]);

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // When form is submitted 
        // call the action which is responsible to hit the login endpoint
        dispatch(loginAction({ email, password }));
    }

    if (isAuthenticated) {
        console.log("I am in here");
        return <Navigate to="/bunch-landing" replace />;
    }

    return (

        <div className="login-wrapper">
            <Alert />
            <div className="login-form-container" id="container">
                <div className="login-form-inner-container sign-in-container">
                    <form action="#" className="login-form" onSubmit={onSubmit}>
                        <h1 className="login-heading">Login</h1>
                        <span className="login-span">sign into your account</span>
                        <input
                            className="login-input"
                            placeholder="Email Address"
                            name="email"
                            autoComplete='email'
                            value={email}
                            onChange={onChange}
                            required
                        />
                        <span className="login-span">
                            This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                        </span>
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
                        <span>Don't have an account? <NavLink to="/register">Sign Up</NavLink></span>
                        <button className="login-button my-1" type='submit'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;