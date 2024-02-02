import { useState, useEffect } from 'react';
import React from 'react'
import BarberCard from './BarberCard';
import ButtonWithIcon from '../../../components/ui/custom/barbers/ButtonWithIcon'
import AddBarberModal from './dialogs/AddBarberModal';
import useBookingServices from 'utils/hooks/useBookingService'
import { Loading } from 'components/shared';
import Button  from 'components/ui/Buttons/Button';
import { Dialog } from 'components/ui';
import { useSelector } from 'react-redux'


const BarbersGrid = () => {
    // Initialize state for the search input
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.auth.user);

    const { getBarbers, addBarbers, disableBarber } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    const [search, setSearch] = useState('');

    //Handling the Disable click ...
    const [disableDialogIsOpen, setIsDisableDialogOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);


    const onStatusSwitcherToggle = (checked, id) => {
        setSelectedId(id);
        setSelectedStatus(checked);
        setIsDisableDialogOpen(true);
    }

    const onDisableDialogClose =() => {
        setSelectedId(null);
        setSelectedStatus(null);
        setIsDisableDialogOpen(false);
    }

    const onDisableDialogOk = async () => {
        setIsDisableDialogOpen(false);
        setLoading(true);

        const data = await disableBarber(selectedId, selectedStatus);
        if(data.status === -1) {
            //something went wrong ...
            setLoading(false);
        }
        else {
              fetchBarbers();
        }

    }

    const fetchBarbers = async () => {
        setLoading(true);
        const data = await getBarbers();
        setBarbers(data);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once

 
    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };


    const handleBarberSave = async (formValues, amenities) => {
        // Handle the form submission here using formValues
        formValues.properties = {}
        formValues.amenities = amenities;
        console.log(formValues);

        //lets make call to server
        const data = await addBarbers(formValues);
        if(data.status === -1) {
            //something went wrong ...
        }
        else {
              // Call fetchServices to refresh the services
            fetchBarbers();
        }

        setOpen(false);
    };



    // Filter the services based on the search input
    const filteredBarbers = barbers.filter(barber => 
        barber.firstName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full"> 

        <div className="flex justify-end gap-4 items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a barber..."
                    className="p-2 border rounded flex-grow"
                    />

                        {(userInfo && Array.isArray(userInfo.roles) && userInfo.roles.length > 0 && (userInfo.roles[0] == 'OWNER')) ? 
                        (
                            <ButtonWithIcon 
                                label="Add Barber"  onClick={handleClickToOpen} 
                            />
                        ) : 
                        (
                            <div></div>
                        )}

                </div>

                <Dialog
                    isOpen={disableDialogIsOpen}
                    onClose={onDisableDialogClose}
                    onRequestClose={onDisableDialogClose}
                >
                    <h5 className="mb-4">{selectedStatus ? "Enable" : "Disable"} Barber</h5>
                    <p>
                        Are you sure you want to {selectedStatus ? "Enable" : "Disable"} this Barber?
                    </p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDisableDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDisableDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog>

                <Loading loading={loading} >
                    <div className="flex gap-4 flex-wrap mt-4"> 
                        {filteredBarbers.map((barber, index) => (
                            <BarberCard key={index} barber={barber} onStatusSwitcherToggle={onStatusSwitcherToggle} />
                        ))}
                    </div>
                </Loading>

                <AddBarberModal open={open} handleToSave={handleBarberSave} handleToClose={handleToClose} />
            </div>
    );
};

export default BarbersGrid;