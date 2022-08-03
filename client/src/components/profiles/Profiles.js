import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getAllProfilesAction } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../layout/Alert';
import ProfileItem from './ProfileItem';

const Profiles = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector((state) => {
        return {
            profiles: state.profile.profiles,
            loading: state.profile.loading
        }
    });

    useEffect(() => {
        dispatch(getAllProfilesAction());
    }, []);

    const renderProfiles = () => {
        return profiles.map((profile) => {
            return <ProfileItem key={profile._id} profile={profile} />
        })
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='container'>
            <Alert />
            <h1 className="profiles-heading">Bunch Mates</h1>
            <p className="profiles-heading profile-tag">
                <i className="fas fa-connectdevelop"></i> Browse and connect with your bunch mates
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (renderProfiles()) : <p> none of your bnch mates have creted a profile </p>}
            </div>
        </div>
    )
}

export default Profiles;