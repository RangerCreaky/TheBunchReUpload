import React, { useEffect, useState } from 'react';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';
import { getCurrentProfileAction, getProfileByIdAction } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub'
import { deleteAccountAndProfileAction } from '../../actions/profile';
const Profile = ({ myId = '' }) => {
    const { profile, loading, auth } = useSelector((state) => {
        return {
            profile: state.profile.profile,
            loading: state.profile.loading,
            auth: state.auth
        }
    });

    const [id, setId] = useState(useParams().id);

    const updateId = () => {
        if (id === undefined) {
            setId(auth?.user?._id);
        }
    }


    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(getProfileByIdAction(id));
        }
        else if (!id) {
            dispatch(getCurrentProfileAction());
            updateId();
        }
    }, [dispatch]);



    const renderExperiences = () => {
        let n = profile?.experience.length;

        return profile?.experience?.map((exp, index) => {
            return (
                <>
                    <ProfileExperience key={exp?._id} experience={exp} />
                    {index === n - 1 ? '' : <hr />}
                </>
            )
        })
    };

    const renderEducation = () => {
        let n = profile?.education.length;
        return profile?.education?.map((edu, index) => {
            return (
                <>
                    <ProfileEducation key={edu?._id} education={edu} />
                    {index === n - 1 ? '' : <hr />}
                </>
            )
        });
    }
    const deleteAccount = () => {
        dispatch(deleteAccountAndProfileAction());
    }

    const onlyForCurrUser = () => {
        if (!profile && auth?.user?._id === id) {
            return (<NavLink to={'/create-profile'} className="bunch-edit-button my-1">
                Create Profile
            </NavLink>);
        }
        else if (auth?.user?._id === id) {
            return (
                <div className="my-2">
                    <button className='btn-danger'>
                        <i className='fas fa-user-minus' onClick={deleteAccount}>Delete My Account</i>
                    </button>
                </div>
            )
        }
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <>
            <div className="bunch-profile">
                <Alert />
                <ProfileTop profile={profile} id={id} />
                <ProfileAbout profile={profile} />
                <hr />

                <div className="background-info">
                    <div className="profile-user-exp bg-white p-1">
                        <h2 className="text-primary">Experiences</h2>
                        {
                            profile?.experience?.length > 0 ? (renderExperiences()) : (<h4> No experiences yet </h4>)
                        }
                    </div>
                    <div className="profile-user-edu bg-white p-1">
                        <h2 className="text-primary">Education</h2>
                        {
                            profile?.education?.length > 0 ? (renderEducation()) : (<h4> No education data </h4>)
                        }
                    </div>
                </div>

                {profile?.githubusername && (
                    <ProfileGithub username={profile?.githubusername} />
                )}

                <NavLink to="/profiles" className="bunch-edit-button" > Back to Profiles </NavLink>
                {
                    onlyForCurrUser()
                }
            </div>
        </>
    )
}
export default Profile;