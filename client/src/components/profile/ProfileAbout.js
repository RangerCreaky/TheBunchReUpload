import React from 'react';
import Spinner from '../layout/Spinner';

const ProfileAbout = ({ profile }) => {
    if (!profile) {
        return (' ')
    }

    const {
        bio,
        skills,
        user
    } = profile;

    return (
        <>
            {bio && <>
                <div class="bunch-about">
                    <h3 class="bunch-h4"> BIO </h3>
                    <p class="bunch-p"> {bio} </p>
                </div>
            </>}

            <div className='profile-skills'>
                <h2 clssName="text-primary">Skill Set</h2>
                <div clssName="skills skill-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    {
                        skills.map((skill, index) => {
                            return (<div className="skill-item" key={index}>
                                <i className="fas fa-check"></i> {skill}
                            </div>)
                        })
                    }
                </div>
            </div>
        </>

    )
}
export default ProfileAbout;