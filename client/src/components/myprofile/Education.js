import React from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEducationAction } from '../../actions/profile';

const Education = () => {
    const dispatch = useDispatch();
    const educationArr = useSelector((state) => {
        return state.profile.profile.education;
    });

    const deleteEdu = (id) => {
        dispatch(deleteEducationAction(id));
    }

    const educations = () => {
        return educationArr.map((edu) => {
            return (
                <tr key={edu._id} >
                    <td className='hide-sm'>{edu.school}</td>
                    <td className='hide-sm'>{edu.degree}</td>
                    <td className='hide-sm'>{edu.fieldofstudy}</td>
                    <td>
                        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
                        {
                            edu.to === null ? 'now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                        }
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={() => deleteEdu(edu._id)} >Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h2 className="my-2">  Education  </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Field Of Study</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'></th>
                    </tr>
                </thead>
                <tbody>
                    {educationArr && educations()}
                </tbody>
            </table>

        </>
    )
}

export default Education;