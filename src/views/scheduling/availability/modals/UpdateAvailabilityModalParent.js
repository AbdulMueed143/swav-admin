import React, { useState, useEffect,  useRef } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import Button from "@mui/material/Button";
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import { Loading } from 'components/shared';
import EditTemplate from './EditTemplate';
import OverrideDates from './OverrideDates';
import { formatDateAsServerDate, isObjectWithAtLeastOneKey } from './utils';


export default function UpdateAvailabilityModalParent({updateBarber, open, handleClose, handleUpdate}) {

    const {  updateBarberAvailability , fetchAvailabilityForDate, updateBarberAvailabilityForDate } = useAvailabilityService();

    const formIkRef = useRef();
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const items = [
        { id: 1, title: "Edit Availability", description : "dd" },
        { id: 2, title: "Override Dates", description : "sss" }
    ];

    const [ selectedItem, setSelectedItem ] = useState(items[0]);
    const handleListItemClick = (item) => {
        setSelectedItem(item);
    }

    const [weekDaysInfo, setWeekDaysInfo] = useState([]);
    const handleWeekDaysInfoUpdate = (newWeekDaysInfo) => {
        setWeekDaysInfo(newWeekDaysInfo);
    };

    const [overrideDates, setOverrideDates] = useState([]);
    const handleOverrideDatesUpdate = (overrideDatesUpdate) => {
        setOverrideDates(overrideDatesUpdate);
    };

    const handleCloseEvent = () => {
        setWeekDaysInfo([]);
        handleOverrideDatesUpdate([]);
        handleClose();
    }

    const save = async () => {
        setLoading(true);
        setWeekDaysInfo([]);

        if(isObjectWithAtLeastOneKey(weekDaysInfo)) {

            const availabilities =  Object.keys(weekDaysInfo).map(day => {
                return {
                    dayOfWeek: day,
                    timeSlots: weekDaysInfo[day]
                };
            });

            const result = await updateBarberAvailability(updateBarber.barberId, availabilities);
    
            if(result.status == -1) {
                console.log("Failed ", result);
            } else {
                console.log("Succeess", result);
            }
        }

        //Now we will check if override dates has changes

        // //and we also have to make call for each day we have data for in list of
        const availabilitiesForDates =  Object.keys(overrideDates)
            .filter(dateString => {
                // Filter out the items where isChanged is true
                return overrideDates[dateString].some(slot => slot.isChanged);
            })
            .map(dateString => {
                const timeSlots = overrideDates[dateString]; // This already is the list of slots for that day
                return {
                    date: formatDateAsServerDate(dateString),
                    timeSlots: timeSlots
                };
            });


        console.log("Availabilities for dates ", availabilitiesForDates);

        const datesResult = await updateBarberAvailabilityForDate(updateBarber.barberId, availabilitiesForDates);
        if(datesResult.status == -1) {
            console.log("Failed ", );
        } else {
            console.log("Succeess", datesResult);
        }

        //close this by calling
        handleUpdate();
        setLoading(false);
    }
    

    return (
        <div stlye={{}}>
            <div>
                <Dialog open={open} onClose={handleCloseEvent}  fullWidth={true}
                    PaperProps={{
                        className: "desktopPaper"
                    }}> 
                    <DialogTitle>{"Standard Weekly Availability Setting ("}{updateBarber?.firstName} {updateBarber?.lastName}{")"}</DialogTitle>
                    <DialogContent dividers>

                    <div className="container">
                        <List className="sidebar">
                            {items.map((item) => (
                                <ListItem 
                                    button 
                                    key={item.id} 
                                    onClick={() => handleListItemClick(item)}
                                    selected={selectedItem && item.id === selectedItem.id}
                                    style={selectedItem && item.id === selectedItem.id ? { backgroundColor: '#e0e0e0', color: 'black' } : {}}
                                >
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            ))}
                        </List>
                        <div className="main-content">
                            {selectedItem ? (
                                <div>
                                    {selectedItem?.id == 1 ? (
                                        <div>
                                            <EditTemplate updateBarber={updateBarber} onWeekDaysDataUpdate={handleWeekDaysInfoUpdate} initialState={weekDaysInfo} />
                                        </div>
                                    ) : (
                                        <div>
                                            <OverrideDates updateBarber={updateBarber} onOverrideDatesUpdate={handleOverrideDatesUpdate} templateInitialState={weekDaysInfo} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>Select an item to view details</p>
                            )}
                        </div>
                    </div>
                    
                    </DialogContent>

                    <DialogActions>

                        <Button 
                            onClick={handleClose}
                            variant="solid"
                            className="ltr:mr-2 rtl:ml-2">
                                Cancel
                        </Button>

                        <Button 
                            backgroundColor="teal"
                            className="ltr:mr-2 rtl:ml-2 " 
                            onClick={() => save()}> 
                                Save Updates
                        </Button> 

                        <Loading loading={loading} >
                        </Loading>
                    </DialogActions>

                </Dialog>
            </div>
        </div>
    );
}
