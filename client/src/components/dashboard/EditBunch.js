import React, { useState } from 'react';
import Alert from '../layout/Alert';
import { NavLink } from 'react-router-dom';
import { editBuncAction } from '../../actions/bunch';
import { useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';

const EditBunch = () => {

    const [formData, setFormData] = useState({
        name: '',
        tag: '',
        description: '',
        wallpaper: '',
        avatar: ''
    });


    const { name, tag, description } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const dispatch = useDispatch();

    const onWallpaperDone = (base64) => {
        setFormData({ ...formData, wallpaper: base64 });
    }

    const onAvatarDone = (base64) => {
        setFormData({ ...formData, avatar: base64 });
    }


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editBuncAction(formData));
        setFormData({
            name: '',
            tag: '',
            description: '',
        })
    }
    return (
        <div className='profile-forms-container'>
            <Alert />
            <h1 className="forms-title">
                Edit Your Bunch details
            </h1>
            <p className="forms-text">
                <i className="fas fa-user"></i> Describe you bunch
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} disabled />
                    <small className="form-text">
                        Name cannot be changed
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="tagline" name="tag" value={tag} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Describe your bunch in a sentence
                    </small>
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
                <div className="form-group">
                    <textarea placeholder="A short note on your bunch" name="description" value={description} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Describe your bunch</small>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to="/dashboard">Go Back</NavLink>
            </form>
        </div>
    )
}

export default EditBunch;