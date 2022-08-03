import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteExperienceAction } from '../../actions/profile';

const Experience = () => {
    const dispatch = useDispatch();
    const experiencesArr = useSelector((state) => {
        return state.profile.profile.experience;
    });

    const deleteExp = (id) => {
        dispatch(deleteExperienceAction(id));
    }

    const experiences = () => {
        return experiencesArr.map((exp) => {
            return (
                <tr key={exp._id} >
                    <td className='hide-sm'>{exp?.company}</td>
                    <td className='hide-sm'>{exp?.title}</td>
                    <td className='hide-sm'>{exp?.location}</td>
                    <td>
                        <Moment format='YYYY/MM/DD'>{exp?.from}</Moment> -
                        {
                            exp.to === null ? 'now' : <Moment format='YYYY/MM/DD'>{exp?.to}</Moment>
                        }
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={() => deleteExp(exp?._id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h2 className="my-2">  Experiences  </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Location</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'></th>
                    </tr>
                </thead>
                <tbody>
                    {experiencesArr && experiences()}
                </tbody>
            </table>

        </>
    )
}

export default Experience;