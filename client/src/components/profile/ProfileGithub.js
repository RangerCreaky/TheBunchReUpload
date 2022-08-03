import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGithubReposAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username }) => {
    const dispatch = useDispatch();
    useEffect((state) => {
        dispatch((getGithubReposAction(username)));
    }, [dispatch, username]);

    const repos = useSelector((state) => {
        return state.profile.repos;
    });

    const renderRepos = () => {
        return repos.map((repo, index) => {
            return (
                <div key={index} className="repo bg-white p-1 my-1">
                    <div className='github-actions'>
                        <div>
                            <h4>
                                <a href={repo.html_url} target="_blank" rel="noreferrer noopener">
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description} hewjfsfvlkfxmvlkfmlksdnbskfgbmslkgcbmldkmbkgxbmvk</p>
                        </div>
                        <div>
                            <ul>
                                <li className='badge badge-primary'>
                                    Stars : {repo.stargazers_count}
                                </li>
                                <li className='badge badge-dark'>
                                    Watchers : {repo.watchers_count}
                                </li>
                                <li className='badge badge-light'>
                                    Forks : {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="profile-github">
            <h1 className="text-primary my-1"> Github Repos </h1>
            {repos === null ? <Spinner /> : (
                renderRepos()
            )}
        </div>
    )
}

export default ProfileGithub;