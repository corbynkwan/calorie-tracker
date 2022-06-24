import './Summary.css';
import { Button } from '@mui/material';
export default function Summary() {

    const openPopUp = () => {
        window.scrollTo({ top: 0, left: 0});
        document.querySelector('.add-intake-popout').style.display = 'unset';
        document.querySelector('.popout-wrapper').style.display = 'flex';
        document.querySelector('body').style.overflowY = 'hidden';
    }

    return (
        <section className="Summary">

            <div className="greeting">
                <h1><small>Good afternoon,</small> Human Being!</h1>
            </div>

            <div className="time-remaining">
                <h3>Its Lunch time in 2 hours!</h3>
            </div>

            <div className="right-intake-status">
                <h3>Your Intake</h3>
                <p>1500 calories remaining</p>
                <div className="progress-bar-underlay"></div>
                <div className="progress-bar-overlay"></div>

                <Button variant="outlined" onClick={openPopUp}>Add More →</Button>
            </div>

        </section>
    );
}