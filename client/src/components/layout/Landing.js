import React from 'react';
import { NavLink } from 'react-router-dom';
import vector from '../../img/Connected-pana.svg';

const Landing = () => {

    return (
        <>
            <section className="landing-section">
                <div className="landing-wrapper-div">
                    <img src={vector} className="landing-graphic" alt="graphic" />
                    <div className="landing-text-div">
                        <p className="landing-text-p">One spot destination, <br />
                            to WORK, CHAT or DISCUSS with your bunch</p>
                        <div className="landing-page-buttons">
                            <NavLink to="/register" className="button">
                                <div className="landing-page-button">Sign up</div>
                            </NavLink>
                            <NavLink to="/login" className="button">
                                <div className="landing-page-button login">Login</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing;