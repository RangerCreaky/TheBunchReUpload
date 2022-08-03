import React, { useRef, useState } from 'react';
import Alert from '../layout/Alert';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import BunchItem from './BunchItem';

const EnterBunch = () => {
    const { inBunch, isAuthenticated, bunches } = useSelector((state) => {
        return {
            inBunch: state?.auth?.inBunch,
            isAuthenticated: state?.auth?.isAuthenticated,
            bunches: state?.auth?.user?.bunches
        };
    });



    const renderBunches = () => {
        return bunches?.map((bunch, index) => {
            return (
                <BunchItem key={bunch?.bunchId} bunchId={bunch?.bunchId} name={bunch?.name} />
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
            <div className="table-wrapper">
                <Alert />

                <h2> Following are the bunches that you have previously Joined </h2>
                <p> Choose the one which you wanted to join, enter it's secret and Tadaaa..! </p>

                <div className='bunches my-3'>
                    {renderBunches()}
                </div>
            </div>
        </>
    )
}

export default EnterBunch;