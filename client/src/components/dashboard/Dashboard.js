import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { NavLink } from 'react-router-dom';
import Alert from '../layout/Alert';
import { loadBunchAction } from '../../actions/bunch';
import UserItem from './UserItem';
import bunchAvatar from '../../img/avatar.png';


const Dashboard = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBunchAction());
    }, [dispatch]);

    const { bunch, loading } = useSelector((state) => {
        return {
            loading: state.auth.loading,
            bunch: state.auth.bunch
        }
    });

    const renderUsers = () => {
        return bunch?.users?.map((user) => {
            return (
                <UserItem key={user?._id} id={user?.user} name={user?.name} avatar={user?.avatar} />
            )
        })
    }

    const leftScroll = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 230;
    }

    const rightScroll = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 230;
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <div className="bunch-profile">
                <Alert />
                <div className="bunch-top-blank">

                </div>
                <div className="bunch-middle-details">
                    <img className="bunch-avatar" src={bunchAvatar} alt="bunch-avatar" />

                    <div className="bunch-name">
                        <h2> {bunch?.name} </h2>
                        <p className="bunch-p"> {bunch?.tag} </p>
                        <NavLink to="/edit-bunch" className="bunch-edit-button" > Edit details </NavLink>
                    </div>
                </div>
                <div className="bunch-about">
                    <h3 className="bunch-h4"> About your Bunch </h3>
                    <p className="bunch-p">{bunch?.description} </p>
                </div>
                <hr className="rule" />
                <h2 className="bunch-users-title"> Your bunch mates</h2>

                <div className="bunch-users-wrapper">
                    <i className="fas fa-solid fa-angle-left left-arrow" onClick={leftScroll}></i>
                    <div className="users-wrapper" id="slider">
                        <div className="users-div">
                            {renderUsers()}

                        </div>
                    </div>
                    <i className="fas fa-solid fa-angle-right right-arrow" onClick={rightScroll}></i>
                </div>
            </div>


        </>
    )
}

export default Dashboard;