import React, { useState,useEffect } from 'react';

import PackagesCard from './RewardsCard';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import useBookingServices from 'utils/hooks/useBookingService'
import { Loading } from 'components/shared';
import Button  from 'components/ui/Buttons/Button';
import { Dialog } from 'components/ui';
import Alert from 'components/ui/Alert'
import { useSelector } from 'react-redux'
import useRewardsService from 'utils/hooks/CustomServices/useRewardsService';
import AddRewardDialog from './dialog/AddRewardDialog';

const RewardsGrid = () => {

    const userInfo = useSelector((state) => state.auth.user);
    const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false);

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
    const [packages, setPackages] = useState([]); // Initial state as an empty array
    const { getRewards, addReward, updateReward, toggleRewardStatus } = useRewardsService();

    const handleClickToOpen = () => {
        setIsRewardDialogOpen(true);
    };
 
    const handleToClose = () => {
        setIsRewardDialogOpen(false);
    };

    //We will be getting all the packages here ...
    const fetchPackages = async () => {
        const data = await getRewards();
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

        //lets make call to server
        const data = await addReward(formValues);
        if(data.status === -1) {
            //something went wrong ...
                  //something went wrong ...
                  setServerError(true);
                  setServerErrorMessage(data.message);
        }
        else {
            fetchPackages();
        }

        setIsRewardDialogOpen(false);
    };

    //Update 
    const [openUpdateModal, setIsUpdateModalOpen] = useState(false);
    const [selectedUpdatablePackage, setSelectedUpdatablePackage] = useState(null);
    const handleClickToOpenUpdateModal = (updateReward) => {
        setSelectedUpdatablePackage(updateReward);
        setIsUpdateModalOpen(true);
    };

    const handleClickToCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedUpdatablePackage(null);
    };

    const handleClickToSaveUpdateModal = async (values, selectedAmenities)  => {
        // Handle the form submission here using formValues

        //lets make call to server
        values.amenitiesIds = selectedAmenities.map(amenity => amenity.id);

        const data = await updateReward(values);
        if(data.status === -1) {
            //something went wrong ...
            setServerError(true);
            setServerErrorMessage(data.message);
        }
        else {
            // Call fetchServices to refresh the services
            fetchPackages();
        }

        setIsRewardDialogOpen(false);
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
        // setIsDeleteDialogOpen(false);
        // const data = await deletePackage(selectedId);
        // if(data.status === -1) {
        //     setServerError(true);
        //     setServerErrorMessage(data.message);
        // }
        // else {
        //       // Call fetchServices to refresh the services
        //     fetchPackages();
        // }
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
                    placeholder="Search for a Rewards..."
                    className="p-2 border rounded  flex-grow"
                />

            {(userInfo && Array.isArray(userInfo.roles) && userInfo.roles.length > 0 && (userInfo.roles[0] == 'OWNER')) ? 
            (
                <ButtonWithIcon 
                label="Add Reward"
                onClick={handleClickToOpen}
                >
                </ButtonWithIcon>
            ) : 
            (
                <div></div>
               
            )}
                
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

            <AddRewardDialog open={isRewardDialogOpen} handleToSave={handleToSave} handleToClose={handleToClose}  />

            {/* <UpdatePackageModal packageData={selectedUpdatablePackage} servicesAvailable={services} open={openUpdateModal} handleToClose={handleClickToCloseUpdateModal} handleToSave={handleClickToSaveUpdateModal} /> */}

        </div>
    );
};

export default RewardsGrid;