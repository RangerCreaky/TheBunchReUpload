import React from 'react';
import Spinner from '../layout/Spinner';
import { useSelector } from 'react-redux';
import MyProfileAction from '../myprofile/MyProfileAction';

const ProfileTop = ({ profile, id }) => {

    const auth = useSelector((state) => {
        return state.auth;
    });

    const decodeBase64 = () => {
        if (profile?.wallpaperProfile) {
            // let base64ToString = Buffer.from(bunch?.wallpaper, "base64").toString();
            return <img src={profile?.wallpaperProfile} alt="wallpaper" className='wallpaper' />
        }
        return '';
    }

    if (!profile && id === auth?.user?._id) {
        return (<h2> You have not created your profile </h2>);
    }

    if (!profile) {
        return (<h2> Profile has not been created </h2>)
    }

    const {
        status,
        company,
        location,
        website,
        social,
        user
    } = profile;


    return (
        <>
            <div className="bunch-top-blank">
                {decodeBase64()}
            </div>
            <div className="bunch-middle-details">
                <img className="bunch-avatar" src={user?.avatar} alt="bunch-avatar" />

                <div className="bunch-name profile-name-details">
                    <h2> {user?.name} </h2>
                    <p className="p-profile">{status} {company && <span> at {company}</span>}</p>
                    <p className="p-profile profile-location"> {location && <span> {location}</span>} </p>
                    {auth?.isAuthenticated &&
                        auth?.loading === false && auth?.user &&
                        auth?.user?._id === profile?.user?._id &&
                        (<MyProfileAction />)
                    }

                </div>
                <div className="icons my-1 profile-user-icons">
                    {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    )
                    }

                    {social && social.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                    )}
                    {social && social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                    )}
                    {social && social.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    )}
                    {social && social.instagram && (
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    )}
                    {social && social.youtube && (
                        <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    )}
                </div>
            </div>
        </>

    )
}

export default ProfileTop;