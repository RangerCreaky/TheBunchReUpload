import React, { useState, useEffect } from 'react';
import Alert from '../layout/Alert';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { joinBunchAction } from '../../actions/bunch';
import { loadBunchAction } from '../../actions/bunch';


const JoinBunch = () => {
    const dispatch = useDispatch();

    const { inBunch, isAuthenticated } = useSelector((state) => {
        return { inBunch: state?.auth?.inBunch, isAuthenticated: state?.auth?.isAuthenticated };
    });


    useEffect(() => {
        dispatch(loadBunchAction());
    }, [dispatch]);
    const [formData2, setFormData2] = useState({
        bunchId: '',
        secret2: '',
    });
    const { bunchId, secret2 } = formData2;


    const onJoinSubmit = (e) => {
        e.preventDefault();
        if (secret2.length < 12) {
            dispatch(setAlert('secret should be atleast 12 characters long', 'danger'));
            setFormData2({
                name: '',
                bunchId: '',
                secret: ''
            });
        }
        else {
            const secret = secret2;
            dispatch(joinBunchAction({ bunchId, secret }));
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
                        <form action="#" className="login-form" onSubmit={onJoinSubmit}>
                            <h1 className="login-heading">Join a Bunch</h1>
                            <span className="login-span">Enter your Bunch credential to join a bunch</span>
                            <input
                                className="login-input"
                                type="text"
                                name="bunchId"
                                value={bunchId}
                                placeholder="Enter the bunch id you want to join"
                                autoComplete='name'
                                onChange={(e) => setFormData2({ ...formData2, [e.target.name]: e.target.value })}
                            />
                            <input
                                className="login-input"
                                type="password"
                                name="secret2"
                                value={secret2}
                                placeholder="Create a secret you your bunch"
                                autoComplete='secret'
                                onChange={(e) => setFormData2({ ...formData2, [e.target.name]: e.target.value })}
                            />
                            <span>Want to create a new bunch? <NavLink to="/register">create a new bunch</NavLink></span>
                            <button className="login-button my-1" type='submit'>Join</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinBunch;