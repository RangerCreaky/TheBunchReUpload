import React, { useEffect } from 'react';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteEducationAction, getProfileByIdAction } from '../../actions/profile';
import { useParams } from 'react-router-dom';

const ProfileEducation = ({ education }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileByIdAction(id));
    }, [dispatch, id]);
    const auth = useSelector((state) => {
        return state.auth;
    });

    const deleteEducation = () => {
        dispatch(deleteEducationAction());
    }

    if (!education) {
        return <Spinner />
    }

    const {
        _id,
        school,
        degree,
        fieldofstudy,
        current,
        to,
        from,
        description
    } = education;
    return (
        <div className='edu-exp-item'>
            <p className='exp-edu-1'> {degree} {auth?.isAuthenticated &&
                auth?.loading === false && auth?.user &&
                auth?.user?._id === id &&
                (<button className='btn-red' onClick={() => deleteEducation(_id)}> X </button>)
            }</p>

            <p className='exp-edu-2'> {school} - {fieldofstudy}</p>
            <p className='exp-edu-4'>  {description} </p>
            <p className='exp-edu-3'><Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
        </div>
    )
}

export default ProfileEducation;