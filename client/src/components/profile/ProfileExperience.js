import React, { useEffect } from 'react';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteExperienceAction, getProfileByIdAction } from '../../actions/profile';
import { Navigate, useParams } from 'react-router-dom';

const ProfileExperience = ({ experience }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const auth = useSelector((state) => {
        return state.auth;
    })

    const deleteExperience = (_id) => {
        dispatch(deleteExperienceAction(id));
        // return (
        //     <Navigate to={`/profile/${id}`} replace />
        // )
    }

    if (!experience) {
        return <Spinner />
    }

    const {
        _id,
        company,
        title,
        location,
        current,
        to,
        from,
        description
    } = experience;

    return (
        <div className='edu-exp-item'>
            <p className='exp-edu-1'> {company}  {auth?.isAuthenticated &&
                auth?.loading === false && auth?.user &&
                auth?.user?._id === id &&
                (<button className='btn-red' onClick={() => deleteExperience(_id)}> X </button>)
            }</p>

            <p className='exp-edu-2'> {title}</p>
            <p className='exp-edu-4'>  {description} </p>
            <p className='exp-edu-3'><Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
        </div>
    )
}

export default ProfileExperience;