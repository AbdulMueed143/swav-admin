import React, { useState, useEffect } from 'react';
import Data from './barberAvailabilityData';
import styles from './updatedAvailabilityView.module.css';
import { Link } from 'react-router-dom';

const UpdatedAvailabilityView = (props) => {
    const [loader, setLoader] = useState(true);
    const [editBarberId, setEditBarberId] = useState(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoader(false);
        }, 1500);

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    const loaderClass = loader ? styles.loader : '';

    return (
        <div className={`${loaderClass}`}>
            {!loader && !editBarberId ?
                <>  <div className={styles.availableDate}>Barber Availability Date: 25th September - 1st October</div>
                    {
                        <div className={styles.table}>
                            <div className={`flex flex-row ${styles.row} ${styles.header}`}>
                                <div className={`${styles.cell} ${styles.barberHeading}`}>Barber</div>
                                <div className={styles.cell}>Monday</div>
                                <div className={styles.cell}>Tuesday</div>
                                <div className={styles.cell}>Wednesday</div>
                                <div className={styles.cell}>Thursday</div>
                                <div className={styles.cell}>Friday</div>
                                <div className={styles.cell}>Saturday</div>
                                <div className={styles.cell}>Sunday</div>
                                <div className={styles.cell}></div>
                            </div>
                            {Data.map((barber) => (
                                <div className={`flex flex-row ${styles.row} ${styles.rowShadow}`} key={barber.id}>
                                    <div className={`${styles.cell} ${styles.imgWrap}`}>
                                        <img src={barber.userpic} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                        <h2 className={styles.barberName}>{barber.name}</h2>
                                    </div>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                                        const availability = barber.availability.find((slot) => slot.day === day);
                                        return (
                                            <div className={`${styles.cell} ${styles.fs12} ${availability?.status !== 'active' ? styles.holiday : styles.notHoliday}`} key={day}>
                                                {availability ? (
                                                    availability.status === 'active' ? (
                                                        <>
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: availability.timeSlot.map((item) => {
                                                                        return `<span class="${styles.itemWrap}"}>${item}</span>`;
                                                                    }).join('')
                                                                }}
                                                            />

                                                        </>
                                                    ) : (
                                                        'Holiday'
                                                    )
                                                ) : ('Holiday'
                                                )}
                                            </div>
                                        );
                                    })}
                                    <div className={styles.cell}>
                                    <Link to={`/availability/edit/${barber.id}`}>
                                        <button className={styles.editBtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            Edit</button>
                                    </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </>
                : <div className={styles.loader} />
            }
        </div>
    )
}

export default UpdatedAvailabilityView
