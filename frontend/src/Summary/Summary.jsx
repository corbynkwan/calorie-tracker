import './Summary.css';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../globalSlices/userSlice'

export default function Summary() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch]); //if dispatch is called anywhere in the app, this will run
    const user = useSelector(state => state.user);
    const openPopUp = () => {
        window.scrollTo({ top: 0, left: 0});
        document.querySelector('.add-intake-popout').style.display = 'unset';
        document.querySelector('.popout-wrapper').style.display = 'flex';
        document.querySelector('body').style.overflowY = 'hidden';
    }

    return (
        <section className="Summary">

            <div className="greeting">
                <h1><small>Good afternoon,</small> {user.name}</h1>
            </div>

            <div className="time-remaining">
                <h3>Its Lunch time in 2 hours!</h3>
            </div>

            <div className="right-intake-status">
                <h3>Your Intake</h3>
                <p>{user.todaysCalories} calories remaining</p>
                <div className="progress-bar-underlay"></div>
                <div className="progress-bar-overlay"></div>

                <Button variant="outlined" onClick={openPopUp}>Add More →</Button>
            </div>

        </section>
    );
}