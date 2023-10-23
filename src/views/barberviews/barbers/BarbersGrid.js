import { useState, useEffect } from 'react';
import React from 'react'
import BarberCard from './BarberCard';
import ButtonWithIcon from '../../../components/ui/custom/barbers/ButtonWithIcon'
import AddBarberModal from './dialogs/AddBarberModal';
import useBookingServices from 'utils/hooks/useBookingService'
import { Loading } from 'components/shared';
import Button  from 'components/ui/Buttons/Button';
import { Dialog } from 'components/ui';



const BarbersGrid = () => {
    // Initialize state for the search input
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { getBarbers, addBarbers, deleteBarber } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    const [search, setSearch] = useState('');

    //Handling the delete click ...
    const [deleteDialogIsOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setIsDeleteDialogOpen(true);
    }

    const onDeleteDialogClose =() => {
        setSelectedId(null);
        setIsDeleteDialogOpen(false);
    }

    const onDeleteDialogOk = async () => {
        setIsDeleteDialogOpen(false);
        setLoading(true);

        const data = await deleteBarber(selectedId);
        if(data.status === -1) {
            //something went wrong ...
            setLoading(false);

        }
        else {
              // Call fetchServices to refresh the services
              fetchBarbers();
        }

    }

    //End of handling the delete click ...

    // Define a function to fetch and update the services
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
            <div className="w-full"> {/* Ensures the container is full width */}
                <div className="flex justify-end gap-4 items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a barber..."
                    className="p-2 border rounded"
                    />
                <ButtonWithIcon 
                    label="Add Barber"  onClick={handleClickToOpen} 
                />
                </div>

                <Dialog
                    isOpen={deleteDialogIsOpen}
                    onClose={onDeleteDialogClose}
                    onRequestClose={onDeleteDialogClose}
                >
                    <h5 className="mb-4">Deleting Barber</h5>
                    <p>
                        Are you sure you want to delete this Barber, if barber has appointments they will be cancelled?
                    </p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDeleteDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDeleteDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog>

                <Loading loading={loading} >
                    <div className="flex gap-4 flex-wrap mt-4"> 
                        {filteredBarbers.map((barber, index) => (
                            <BarberCard key={index} barber={barber} onDeleteClick={handleDeleteClick} />
                        ))}
                    </div>
                </Loading>

                <AddBarberModal open={open} handleToSave={handleBarberSave} handleToClose={handleToClose} />
            </div>
    );
};

export default BarbersGrid;