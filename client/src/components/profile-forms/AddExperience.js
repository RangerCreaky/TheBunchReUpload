import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addExperienceAction } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { company, title, location, from, to, current, description } = formData;

    const [toDateDisabled, setToDate] = useState(false);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const checkboxChanged = (e) => {
        if (e.target.checked) {
            setToDate(true);
            setFormData({ ...formData, current: !current })
        }
        else {
            setToDate(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
        dispatch(addExperienceAction(formData));
    }


    return (
        <section className="profile-forms-container">
            <Alert />
            <h1 className="forms-title">
                Add An Experience
            </h1>
            <p className="forms-text">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="checkbox" name="current" className="current" onChange={checkboxChanged} /> Current Job
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" disabled={toDateDisabled ? true : false} value={to} onChange={onChange} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to="/profile/me">Go Back</NavLink>
            </form>
        </section>
    )
}

export default AddExperience;