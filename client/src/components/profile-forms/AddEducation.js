import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addEducationAction } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddEducation = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

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
        dispatch(addEducationAction(formData));
    }


    return (
        <section className="profile-forms-container">
            <Alert />
            <h1 className="forms-title">
                Add your education
            </h1>
            <p className="forms-text">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have added
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* School name" name="school" value={school} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" className="current" name="current" onChange={checkboxChanged} /> Current School</p>
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
                        placeholder="Program Description"
                        value={description} onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to="/my-profile">Go Back</NavLink>
            </form>
        </section>
    )
}

export default AddEducation;