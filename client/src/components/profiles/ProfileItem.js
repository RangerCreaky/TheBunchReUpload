import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user,
        status,
        company,
        location,
        skills
    }
}) => {

    // console.log(_id, name, avatar);


    return (
        <div className='post-custom p-1 profile-custom'>
            <div className='div-details profile-div-details'>
                <div>
                    <img src={user?.avatar} alt="" className="round-img post-avatar" />
                </div>
                <div>
                    <h2>{user?.name}</h2>
                    <p>{status} {company && <span> at {company} </span>}</p>
                    <p className='location'> {location && <span>{location}</span>} </p>
                    <NavLink to={`/profile/${user?._id}`} className="bunch-edit-button" > View Profile </NavLink>
                </div>

            </div>
            <div className='skill-element'>
                <ul>
                    {skills.map((skill, index) => {
                        return (
                            <li key={index} className="text-primary"><i className="fas fa-check"></i>  {skill}</li>
                        )
                    })}
                </ul>
            </div>
        </div >
    )
}

export default ProfileItem;