import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfileAction } from '../../actions/profile';
import { useNavigate, NavLink } from 'react-router-dom';
import Alert from '../layout/Alert';
import FileBase64 from 'react-file-base64';
import './form.css'



const EditProfile = () => {

    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => {
        return {
            profile: state.profile.profile,
            loading: state.profile.loading
        }
    });

    const initialFormData = {
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        wallpaper: '',
        avatar: ''
    }

    useEffect(() => {
        // If the Profile is Not already present
        // Then we fetch one
        if (!profile) dispatch(getCurrentProfileAction());

        // Now traverse through the profile object and get the value for each field
        // create a profileData object and initialize it with empty string
        const profileData = { ...initialFormData };

        // Traverse through the profile
        if (profile) {
            // Object.keys convert an oobject to iterable form
            // Before the profile first loads , it is undefined.
            // SO we need to add || {}
            for (const key of Object.keys(profile || {})) {
                if (key in profileData) profileData[key] = profile[key];
            }
            for (const key of Object.keys(profile.social || {})) {
                if (key in profileData) profileData[key] = profile.social[key];
            }


            // skills is an array
            profileData.skills = profileData.skills.join(",");
        }

        // Do the same thing for socials

        setFormData(profileData);
    }, [profile, loading, dispatch]);



    const [formData, setFormData] = useState(initialFormData);

    const [displaySocialInputs, toggleSocialinputs] = useState(false);

    // destructure the formData
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createProfile(formData, true, navigate))
    }

    const onWallpaperDone = (base64) => {
        setFormData({ ...formData, wallpaper: base64 });
    }

    const onAvatarDone = (base64) => {
        setFormData({ ...formData, avatar: base64 });
    }

    return (
        <div className='profile-forms-container '>
            <Alert />
            <h1 className="forms-title">
                Create Your Profile
            </h1>
            <p className="forms-text">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text">City and state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername} onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your
                        username
                    </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>
                <div className="form-group">
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => onWallpaperDone(base64)} />
                    <small className="form-text">
                        choose a wallpaper for your bunch
                    </small>
                </div>
                <div className="form-group">
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => onAvatarDone(base64)} />
                    <small className="form-text">
                        choose an avatar for your bunch
                    </small>
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocialinputs(!displaySocialInputs)}
                        type="button" className="btn btn-light"
                    >
                        {displaySocialInputs ? 'Remove' : 'Add'} Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {
                    displaySocialInputs &&
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                        </div>
                    </>
                }


                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to="/my-profile">Go Back</NavLink>
            </form>
        </div>
    )
};

export default EditProfile;