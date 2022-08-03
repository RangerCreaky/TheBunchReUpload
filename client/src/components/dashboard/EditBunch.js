import React, { useState } from 'react';
import Alert from '../layout/Alert';
import { NavLink } from 'react-router-dom';
import { editBuncAction } from '../../actions/bunch';
import { useDispatch } from 'react-redux';

const EditBunch = () => {

    const [formData, setFormData] = useState({
        name: '',
        tag: '',
        description: ''
    });
    const { name, tag, description } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const dispatch = useDispatch();
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
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="tagline" name="tag" value={tag} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Describe your bunch in a sentence
                    </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short note on your bunch" name="description" value={description} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to="/dashboard">Go Back</NavLink>
            </form>
        </div>
    )
}

export default EditBunch;