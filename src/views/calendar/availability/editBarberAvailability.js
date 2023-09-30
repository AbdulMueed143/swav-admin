import React, { useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import Data from './barberAvailabilityData';
import styles from './editBarberAvailability.module.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { CalendarView, Loading } from 'components/shared';
// import { Card } from 'components/ui';
import { CalendarView } from "components/shared";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function Popup({ open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Popup Title</DialogTitle>
            <DialogContent>
                <p>This is the content of the popup.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    green: {
        color: '#32a84c',
    },
    d: {
        padding: '6px 12px',
        fontSize: '13px',
        textTransform: 'none'
    }
}));

const EditBarberAvailability = (props) => {
    const { barberId } = useParams();
    const classes = useStyles();
    const currentData = Data[barberId - 1];

    const [openPopup, setOpenPopup] = useState(false);

    const handleClosePopup = () => {
        setOpenPopup(false);
    };


    const changeShiftHandler = (day) => {
        console.log('Day Called: ', day);
        setOpenPopup(true);
    }

    const today = new Date().toISOString().split('T')[0];

    const pickDateHandler = (date) => {
        console.log(date.target.value);
    }

    const addHolidayHandler = () => {
        // e.preventDefault();
        console.log('Holiday Added...');
    }

    const saveShiftPopup = () => {
        console.log('Save Shift...');
    }

    const calendarRef = useRef(null);

    return (
        <div>
            <div className={styles.barberWrapper}>
                <h1 className="">{currentData?.name}</h1>
                <img
                    src={currentData?.userpic}
                    className="w-20 h-20 rounded-full my-6"
                    alt="Barber"
                />
            </div>
            <div className={`${styles.editWrapper} flex gap-10`}>
                <div className={`${styles.calendarView}`}>
                    <div className={`flex flex-row ${styles.row} ${styles.header}`}>
                        <div className={styles.cell}>Monday</div>
                        <div className={styles.cell}>Tuesday</div>
                        <div className={styles.cell}>Wednesday</div>
                        <div className={styles.cell}>Thursday</div>
                        <div className={styles.cell}>Friday</div>
                        <div className={styles.cell}>Saturday</div>
                        <div className={styles.cell}>Sunday</div>
                    </div>
                    {
                        currentData && (
                            <div className={`flex flex-row ${styles.row} relative`} key={currentData.id}>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                                    const availability = currentData.availability.find((slot) => slot.day === day);
                                    return (
                                        <div className={`${styles.cell} ${styles.fs12} ${availability?.status !== 'active' ? styles.holiday : styles.notHoliday}`} key={day}>
                                            {availability ? (
                                                availability.status === 'active' ? (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: availability.staticTimeSlot?.map((item) => {
                                                                return `<span class="${styles.itemWrap}"}>${item}</span>`;
                                                            }).join('')
                                                        }}
                                                    />
                                                ) : (
                                                    'Holiday'
                                                )
                                            ) : ('Holiday'
                                            )}
                                            <div className={styles.addShiftBtn}>
                                                <button className={styles.addBtn} onClick={() => changeShiftHandler(availability?.day)}>+ Add Shift</button>
                                                {
                                                    openPopup && (
                                                        <div className={styles.addShiftPopUp}>
                                                            <div className={styles.addShiftPopUpWrapper}>
                                                                <TextField
                                                                    id="filled-secondary"
                                                                    label="Add Shift"
                                                                    variant="filled"
                                                                    color="primary"
                                                                />
                                                                <button className={styles.addShiftBtnPopUp} onClick={() => saveShiftPopup()}>Save</button>
                                                                <button className={styles.closeBtn} onClick={() => handleClosePopup()}>X</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    }
                    <div className={styles.barberCalendar}>
                        <h2 className="">Override</h2>
                        <CalendarView calendarRef={calendarRef} />
                    </div>
                </div>
                {/* Add Holiday Component */}
                <div className={`${styles.addShift}`}>
                    <div className={`${styles.calendarWrapper}`}>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Choose Holiday Date"
                                type="date"
                                className={`${classes.textField} ${classes.green}`}
                                InputLabelProps={{
                                    shrink: true,
                                    fontWeight: 800,
                                    style: {
                                        color: '#000',
                                        fontSize: '18px'
                                    }
                                }}
                                inputProps={{
                                    min: today,
                                    style: {
                                        color: '#000',
                                        border: '1.5px solid #ccc',
                                        padding: '9px',
                                        margin: '10px 0 40px'
                                    }
                                }}
                                onChange={pickDateHandler}
                            />
                        </form>
                        <button className={`${styles.addBtn} ${styles.addHoliday}`} onClick={() => addHolidayHandler()}>+ Add Holiday</button>
                    </div>
                    <div className={`${styles.holidayList}`}>
                        <ul>
                            <li><span className={styles.leaveDate}>2nd October</span><span className={styles.deleteIcon}><DeleteIcon /></span></li>
                            <li><span className={styles.leaveDate}>3rd October</span><span className={styles.deleteIcon}><DeleteIcon /></span></li>
                            <li><span className={styles.leaveDate}>4th October</span><span className={styles.deleteIcon}><DeleteIcon /></span></li>
                            <li><span className={styles.leaveDate}>5th October</span><span className={styles.deleteIcon}><DeleteIcon /></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

function DeleteIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
        </svg>
    )
}

export default EditBarberAvailability;