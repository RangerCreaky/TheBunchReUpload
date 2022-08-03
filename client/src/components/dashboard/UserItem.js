import React from 'react';
import { NavLink } from 'react-router-dom';

const UserItem = ({ name, avatar, id }) => {
    return (
        <div className='user-item bg-light'>

            <div className="user">
                <img className="bunch-user-img" src={avatar} alt="user avatar" />
                <div className="bunch-users-text">
                    <h2 className="bunch-user-name"> {name} </h2>
                    <NavLink to={`/profile/${id}`} className="btn bunch-user-button"> View profile </NavLink>
                </div>
            </div>
        </div >
    );
}

export default UserItem;