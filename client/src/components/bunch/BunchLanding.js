import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { createBunchAction, loadBunchAction, joinBunchAction } from '../../actions/bunch';
import Alert from '../layout/Alert';

const BunchLanding = () => {




    const [secret3, setSecret3] = useState('');

    const bunches = useSelector((state) => {
        return state?.auth?.user?.bunches;
    })

    const dispatch = useDispatch();
    const { inBunch, isAuthenticated } = useSelector((state) => {
        return { inBunch: state?.auth?.inBunch, isAuthenticated: state?.auth?.isAuthenticated };
    });

    useEffect(() => {
        dispatch(loadBunchAction());
    }, [dispatch]);



    const onJoinSubmit = (e, enter = false, id = '') => {
        e.preventDefault();

        if (enter) {
            console.log('helloworld');
            if (secret3.length < 12) {
                dispatch(setAlert('secret should be atleast 12 characters long', 'danger'));
            }
            else {
                const bunchId = id; const secret = secret3;
                console.log(bunchId, secret);
                dispatch(joinBunchAction(bunchId, secret));
            }
        }
    }

    const renderBunches = () => {
        return bunches?.map((bunch) => {
            return (
                <form key={bunch?.bunchId} className='form' onSubmit={(e) => onJoinSubmit(e, true, bunch?.bunchId)}>
                    <input type="text" hidden={true} value={bunch?.bunchId} readOnly autoComplete='one' />
                    <input autoComplete='current-password' type="password" value={secret3} onChange={(e) => setSecret3(e.target.value)} placeholder="enter your secret" />
                    <button className='btn btn-primary' disabled={true}> {bunch?.name} </button>
                    <input className='btn btn-primary' type="submit" value="Enter" />
                </form>
            )
        })
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (inBunch) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <>
            <div className="card-wrapper">
                <div className="row1-container">
                    <div className="box box-down cyan">
                        <h2 className="card-h2"><NavLink to="/join-bunch"> Join new Bunch </NavLink></h2>
                        <p>To join a new bunch, the idea is simple. Just get the id and secret from your frnds and join in one
                            click</p>
                        <img src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt="" />
                    </div>

                    <div className="box red">
                        <h2 className="card-h2"><NavLink to="/create-bunch">Build new Bunch</NavLink></h2>
                        <p>Create a space for you gang to work, post or discuss your stuff together</p>
                        <img src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt="" />
                    </div>

                    <div className="box box-down blue">
                        <h2 className="card-h2"><NavLink to="/enter-bunch"> Enter a bunch </NavLink></h2>
                        <p> Pick a bunch which you have joined previously and enter into it!</p>
                        <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt="" />
                    </div>
                </div>
            </div>
        </>


    )

}


/* <div className='container'>
            <Alert />
            

            <hr className='my-2' />

            

            <hr className='my-2' />
            <h2 className='text-primary'> Enter into any of you bunch </h2>
            {renderBunches()}
        </div> */

export default BunchLanding;