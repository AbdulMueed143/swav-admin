import React, { useState,useEffect } from 'react';

import PackagesCard from './PackagesCard';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import AddPackageModal from '../dialog/AddPackagesModal';
import usePackageService from 'utils/hooks/CustomServices/usePackagesService'
import useBookingServices from 'utils/hooks/useBookingService'
import UpdatePackageModal from '../dialog/UpdatePackagesModal';
import { Loading } from 'components/shared';
import Button  from 'components/ui/Buttons/Button';
import { Dialog } from 'components/ui';
import Alert from 'components/ui/Alert'

const PackagesGrid = () => {

       //Alert
       const [serverError, setServerError] = useState(false);
       const [serverErrorMessage, setServerErrorMessage] = useState(false);
   
       const handleAlertClose = () => {
           setServerError(false);
           setServerErrorMessage('');
       }
   

    //getting services to be used later on
    const { getServices } = useBookingServices();
    const [services, setServices] = useState([]); // Initial state as an empty array

     const fetchServices = async () => {
        const data = await getServices();
        setServices(data);
    };

    useEffect(() => {
        fetchServices();
    }, []); 

    ///Ignore above part

    // Initialize state for the search input
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [packages, setPackages] = useState([]); // Initial state as an empty array
    const { getPackages, addPackage, updatePackage, deletePackage } = usePackageService();

    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

        //We will be getting all the packages here ...
        const fetchPackages = async () => {
            const data = await getPackages();
            setPackages(data);
        };

    useEffect(() => {
        // Call fetchServices on component mount
        fetchPackages();
    }, []); // Empty dependency array means the effect will only run once


    const handleToSave = async (formValues, selectedAmenities) => {
        // Handle the form submission here using formValues
        formValues.properties = {}
        formValues.amenitiesIds = selectedAmenities.map(amenity => amenity.id);
        console.log(formValues);

        //lets make call to server
        const data = await addPackage(formValues);
        if(data.status === -1) {
            //something went wrong ...
                  //something went wrong ...
                  setServerError(true);
                  setServerErrorMessage(data.message);
        }
        else {
            fetchPackages();
        }

        setOpen(false);
    };

    //Update 
    const [openUpdateModal, setIsUpdateModalOpen] = useState(false);
    const [selectedUpdatablePackage, setSelectedUpdatablePackage] = useState(null);
    const handleClickToOpenUpdateModal = (updatePackage) => {
        setSelectedUpdatablePackage(updatePackage);
        setIsUpdateModalOpen(true);
    };

    const handleClickToCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedUpdatablePackage(null);
    };


    //Whateve

    //Handling Update Model

    const handleClickToSaveUpdateModal = async (values, selectedAmenities)  => {
        // Handle the form submission here using formValues

        console.log(values);
        //lets make call to server
        values.amenitiesIds = selectedAmenities.map(amenity => amenity.id);

        const data = await updatePackage(values);
        if(data.status === -1) {
            //something went wrong ...
            setServerError(true);
            setServerErrorMessage(data.message);
        }
        else {
            // Call fetchServices to refresh the services
            fetchPackages();
        }

        setOpen(false);
        handleClickToCloseUpdateModal();
    }
 

    //======= End of handling Update Modal

    //Delete functionality 

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
        const data = await deletePackage(selectedId);
        if(data.status === -1) {
            setServerError(true);
            setServerErrorMessage(data.message);
        }
        else {
              // Call fetchServices to refresh the services
            fetchPackages();
        }
    }

    // Filter the packages based on the search input
    const filteredPackages = packages.filter(cpackage =>
        cpackage.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex justify-end gap-4 items-center"> {/* Add flex, justify-end, and items-center for alignment */}
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search for a package..."
                    className="p-2 border rounded  flex-grow"
                />

                <ButtonWithIcon 
                    label="Add Package"
                    onClick={handleClickToOpen}
                >
                </ButtonWithIcon>
                
            </div>

            {serverError && (
             <div>
                <Alert showIcon onClose={handleAlertClose} type="danger" title="Error!">
                    {serverErrorMessage}
                </Alert>
            </div>
            )}


            <Dialog
                isOpen={deleteDialogIsOpen}
                onClose={onDeleteDialogClose}
                onRequestClose={onDeleteDialogClose}
            >
                <h5 className="mb-4">Deleting Service</h5>
                <p>
                    Are you sure you want to delete this service?
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

            <div className="flex gap-4 flex-wrap mt-4"> 
                {filteredPackages.map((cpackage, index) => (
                    <PackagesCard key={index} currentPackage={cpackage} servicesAvailable={services} onUpdateClick={handleClickToOpenUpdateModal} onDeleteClick={handleDeleteClick} />
                ))}
            </div>

            <AddPackageModal open={open} handleToSave={handleToSave} handleToClose={handleToClose} /> 
            <UpdatePackageModal packageData={selectedUpdatablePackage} servicesAvailable={services} open={openUpdateModal} handleToClose={handleClickToCloseUpdateModal} handleToSave={handleClickToSaveUpdateModal} />

        </div>
    );
};

export default PackagesGrid;