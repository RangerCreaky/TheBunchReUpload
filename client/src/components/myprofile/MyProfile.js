import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfileAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { NavLink } from 'react-router-dom';
import Alert from '../layout/Alert';
import MyProfileAction from './MyProfileAction';
import Experience from './Experience';
import Education from './Education';
import { deleteAccountAndProfileAction } from '../../actions/profile';


const MyProfile = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentProfileAction())
    }, [dispatch]);

    const { profile, loading, user } = useSelector((state) => {
        return {
            profile: state.profile.profile,
            loading: state.profile.loading,
            user: state.auth.user
        }
    });

    const deleteAccount = () => {
        dispatch(deleteAccountAndProfileAction());
    }

    return (loading && profile === null ? <Spinner /> : <>
        <>
            <div class="bunch-profile">
                <Alert />
                <div class="bunch-top-blank">

                </div>
                <div class="bunch-middle-details">
                    <img class="bunch-avatar" src={user?.avatar} alt="bunch-avatar" />

                    <div class="bunch-name">
                        <h2> {user?.name} </h2>
                        <MyProfileAction />
                    </div>
                </div>
                {
                    profile !== null ? (
                        <>
                            <Experience />
                            <Education />

                            <div className="my-2">
                                <button className='btn btn-danger'>
                                    <i className='fas fa-user-minus' onClick={deleteAccount}>Delete My Account</i>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>You have not set up your profile yet, please add some info</p>
                            <NavLink to={'/create-profile'} className="btn btn-primary my-1">
                                Create Profile
                            </NavLink>
                        </>
                    )
                }
            </div>
        </>
    </>

    )
}

export default MyProfile;