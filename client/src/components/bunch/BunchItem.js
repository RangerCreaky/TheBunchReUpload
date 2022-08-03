import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinBunchAction } from '../../actions/bunch';

const BunchItem = ({ bunchId, name }) => {
    const [secret, setSecret] = useState('');
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(joinBunchAction({ bunchId, secret }))
    }

    return (
        <>
            <div className='bunch'>
                <div className="bunch-text"><h4 className='bunch-h4'> {name} : </h4></div>

                <form action="" onSubmit={onSubmit} className="enter-bunch-form">
                    <input type="hidden" name="bunchId" value={bunchId} />
                    <input type="password"
                        className="form__field"
                        placeholder="Secret"
                        name="secret"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        required
                        autoComplete='password'
                    />
                    <button className="login-button my-1 enter-button" type='submit'>Join</button>
                </form>
            </div>
            <hr className='my-2'></hr>
        </>
    )
}

export default BunchItem;