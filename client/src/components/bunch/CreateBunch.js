import React, { useState, useEffect } from 'react';
import Alert from '../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { createBunchAction, loadBunchAction } from '../../actions/bunch';
import { setAlert } from '../../actions/alert';
import { NavLink, Navigate } from 'react-router-dom';

const CreateBunch = () => {
    const { inBunch, isAuthenticated } = useSelector((state) => {
        return { inBunch: state?.auth?.inBunch, isAuthenticated: state?.auth?.isAuthenticated };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBunchAction());
    }, [dispatch]);

    const [formData1, setFormData] = useState({
        secret: '',
        name: ''
    });

    const { secret, name } = formData1;
    const onCreateSubmit = (e) => {
        e.preventDefault();
        if (secret.length < 12) {
            dispatch(setAlert('secret should be atleast 12 characters long', 'danger'));
            setFormData({
                name: '',
                bunchId: '',
                secret: ''
            });
        }
        else {
            dispatch(createBunchAction({ name, secret }));
        }
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (inBunch) {
        return <Navigate to="/dashboard" replace />
    }

    return (

        <>

            <div className="login-wrapper">
                <Alert />
                <div className="login-form-container" id="container">
                    <div className="login-form-inner-container sign-in-container">
                        <form action="#" className="login-form" onSubmit={onCreateSubmit}>
                            <h1 className="login-heading">Create a New Bunch</h1>
                            <span className="login-span"></span>
                            <input
                                type="text"
                                className="login-input"
                                name="name"
                                value={name}
                                placeholder="Enter a name for you bunch"
                                autoComplete='name'
                                onChange={(e) => setFormData({ ...formData1, [e.target.name]: e.target.value })}
                            />
                            <input
                                className="login-input"
                                type="password"
                                name="secret"
                                value={secret}
                                placeholder="Create a secret you your bunch"
                                autoComplete='secret'
                                onChange={(e) => setFormData({ ...formData1, [e.target.name]: e.target.value })}
                            />
                            <span>Want to Join your friends bunch? <NavLink to="/join-bunch">Join an Existing Bunch</NavLink></span>
                            <button className="login-button my-1" type='submit'>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CreateBunch;