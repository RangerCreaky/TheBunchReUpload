import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import vector from '../../img/Connected-pana.svg';

const Landing = () => {
    const { isAuthenticated, inBunch } = useSelector((state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            inBunch: state.auth.inBunch
        }
    });

    if (inBunch) {
        return <Navigate to="/dashboard" replace />
    }

    if (isAuthenticated) {
        return <Navigate to="/bunch-landing" replace />
    }
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

            <div className='details container'>
                <h2 class="details__heading"> Why should you use it ? </h2>
                <p className='details__para'> Ever felt that social media to be over glamorized by the influencers?  Felt that such platforms potray false sense of reality?
                    If you have, then you are not alone. It is no secret that it can foster a sense of discontentment, insecurity, or even depression. When we see others accomplishing more than us, it can breed low self-esteem or even a lack of self-worth.

                    <br />
                    <br />
                    The real challenge comes when we become envious of everything our people appear to be doing online. We compare their online world with our offline world and we often feel we don’t measure up. Of course, we forget that we ourselves will only post the bright spots of our day, so we find ourselves comparing the best of our online friend’s lives to the worst of our own.

                    <br />
                    <br />

                    <h4 class="details_inner"> But bunch is different! </h4>
                    The best place for us to spend our time is with our Close friends, The one's who form a spider web aroud you when you are off.
                    The best place for us is with our <span className='bold'> Bunch </span>

                    So here is bunch. Where you can <br />
                    and <span className='bold'> Share </span> your thoughts, memories and experiences with and chat anything or everything about the world with your Bunch. <br />
                    Or  <span className='bold'> Discuss </span> about the project with your team mates <br />
                    Or <span className='bold'> Update </span> about your work to your collegues

                    <br />
                    A platform for you and your people. With whom you can express anything without a feeling of being judged. Away from all the glamour which may or may not be real. Because here, <br />
                    <h4 class="details__inner"> It is just you and your bunch! </h4>
                </p>



            </div>
        </>
    )
}

export default Landing;