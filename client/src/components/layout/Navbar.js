import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../actions/auth';
import { exitAction } from '../../actions/bunch';
import logo from '../../img/bunch.png';
const Navbar = () => {
    const user = useSelector((state) => {
        return state.auth.user;
    })
    // find of the user is authenticated 
    // and if the user is loading
    const { isAuthenticated, loading, inBunch } = useSelector((state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            loading: state.auth.loading,
            inBunch: state.auth.inBunch
        }
    });

    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        dispatch(logoutAction());
    }

    const exit = (e) => {
        e.preventDefault();
        dispatch(exitAction());
    }

    const guestLinks = () => {
        return (
            <ul className="navbar-contents-ul">
                {/* <li><NavLink to="profiles">Developers</NavLink></li> */}
                <li className="navbar-contents-li"><NavLink to="/register" className="navbar-contents-name-a">Register</NavLink></li>
                <li className="navbar-contents-li"><NavLink to="/login" className="navbar-contents-name-a">Login</NavLink></li>
            </ul>
        )
    };

    const userLinks = () => {
        return (
            <ul className="navbar-contents-ul">
                <li className="navbar-contents-li">
                    <a href="#!" onClick={logout} className="navbar-contents-name-a">
                        <i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span>
                    </a>
                </li>
                <li className="navbar-contents-li">
                    {/* Dashboard is to show bunch data */}
                    <NavLink to={`/profile/${user?._id}`} className="navbar-contents-name-a">
                        <i className="fas fa-user"></i>{' '}
                    </NavLink>
                </li>
            </ul >
        )
    }

    const inBunchLinks = () => {
        return (
            <ul className="navbar-contents-ul">
                <li className="navbar-contents-li">
                    <NavLink to={`/profile/${user?._id}`} className="navbar-contents-name-a">
                        <i className="fas fa-user"></i>{' '}
                    </NavLink>
                </li>
                <li className="navbar-contents-li">
                    {/* Dashboard is to show bunch data */}
                    <a href="#!" onClick={exit} className="navbar-contents-name-a">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>{' '}<span className="hide-sm">Exit</span>
                    </a>
                </li>
                <li className="navbar-contents-li"><NavLink to="/profiles" className="navbar-contents-name-a">Profiles</NavLink></li>
                <li className="navbar-contents-li"><NavLink to="/posts" className="navbar-contents-name-a"><i class="fas fa-usps"></i>Posts</NavLink></li>
                <li className="navbar-contents-li">
                    {/* Dashboard is to show bunch data */}
                    <NavLink to="/dashboard" className="navbar-contents-name-a">
                        <i className="fas fa-server"></i>{'   '}<span className="hide-sm">Dashboard</span>
                    </NavLink>
                </li>
            </ul>
        )
    }

    const showLinks = () => {
        if (!isAuthenticated) {
            return (guestLinks());
        }

        if (isAuthenticated && !inBunch) {
            return (userLinks());
        }

        if (isAuthenticated && inBunch) {
            return (inBunchLinks());
        }
    }

    return (

        <>
            <div className="header">
                <nav className="global">
                    <img src={logo} className="navbar-logo" alt="logo" />
                    <NavLink to="/" className="navbar-title-wrapper-div">
                        <span className="navbar-title-wrapper-span">
                            <span className="navbar-title-text"> Bunch </span>
                        </span>
                    </NavLink>

                    {
                        (<>
                            {showLinks()}
                        </>)
                    }
                </nav>
            </div>
        </>
    )
}

export default Navbar;