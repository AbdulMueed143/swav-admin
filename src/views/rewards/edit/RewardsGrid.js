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
import RewardCard from './RewardsCard';
import UpdateRewardDialog from './dialog/UpdateRewardDialog';
import useBarberService from 'utils/hooks/CustomServices/useBarberService';

const RewardsGrid = () => {


    //Informations about current user
    const userInfo = useSelector((state) => state.auth.user);
    const { fetchBarberShopDetail } = useBarberService();

    useEffect(() => {
        fetchShopDetail();
    }, [userInfo]);
    

    //Dialogs
    const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false);
    const [isUpdateRewardDialogOpen, setIsUpdateRewardDialogOpen] = useState(false);
    const [barberShopInfo, setBarberShopInfo] = useState(null);
    
    //Loading
    const [loading, setLoading] = useState(false);

    //Alert dialog
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);

    const handleAlertClose = () => {
        setServerError(false);
        setServerErrorMessage('');
    }
   

    // Initialize state for the search input
    const [search, setSearch] = useState('');
    const [rewards, setRewards] = useState([]); // Initial state as an empty array
    const { getRewards, addReward, updateReward, toggleRewardStatus } = useRewardsService();

    const handleClickToOpen = () => {
        setIsRewardDialogOpen(true);
    };
 
    const handleToClose = () => {
        setIsRewardDialogOpen(false);
    };

    //We will be getting all the packages here ...
    const fetchRewards = async () => {
        setLoading(true);
        const data = await getRewards();
        setRewards(data);
        setLoading(false);
    };

    useEffect(() => {
        // Call fetchServices on component mount
        fetchRewards();
    }, []); // Empty dependency array means the effect will only run once


    const handleToSave = async (formValues, rewardType, rewardSource, expiryDate) => {
        // Handle the form submission here using formValues
        // formValues.properties = {}
        formValues.expiryDate = expiryDate;
        formValues.type = rewardType?.value;
        formValues.source = rewardSource?.value;

        console.log("Form Values ", formValues);

        //lets make call to server
        const data = await addReward(formValues);
        if(data.status === -1) {
            //something went wrong ...
            setServerError(true);
            setServerErrorMessage(data.message);
        }
        else {
            fetchRewards();
        }

        setIsRewardDialogOpen(false);
    };

    //Update 
    const [selectedRewardForUpdate, setSelectedRewardForUpdate] = useState(null);
    const handleClickToOpenUpdateModal = (updateReward) => {
        setSelectedRewardForUpdate(updateReward);
        setIsUpdateRewardDialogOpen(true);
    };

    const handleClickToCloseUpdateModal = () => {
        setIsUpdateRewardDialogOpen(false);
        setSelectedRewardForUpdate(null);
    };

    const handleClickToSaveUpdateModal = async (id, formValues, rewardType, rewardSource, expiryDate)  => {
        // Handle the form submission here using formValues

        formValues.id = id;
        formValues.expiryDate = expiryDate;
        formValues.type = rewardType?.value;
        formValues.source = rewardSource?.value;

        console.log("Form Values ", formValues);

        //lets make call to server
        const data = await updateReward(formValues);
        if(data.status === -1) {
            //something went wrong ...
            setServerError(true);
            setServerErrorMessage(data.message);
        }
        else {
            fetchRewards();
        }

        setIsRewardDialogOpen(false);

        setIsRewardDialogOpen(false);
        handleClickToCloseUpdateModal();
    }

    //The shop things
    const fetchShopDetail = async() =>  {
        setLoading(true);

        const response = await fetchBarberShopDetail(userInfo.barberShopId);

        if(response.status == -1) {
            //error
            setServerError(true);
            setServerErrorMessage(response.message);
        }
        else {
            setBarberShopInfo(response);
        }

        //now show error or get the detail
        setLoading(false);
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

    // Gotta add the search function
    // const filteredPackages = packages.filter(cpackage =>
    //     cpackage.name.toLowerCase().includes(search.toLowerCase())
    // );

    return (
        <div className="w-full">
            <div className="flex justify-end gap-4 items-center"> {/* Add flex, justify-end, and items-center for alignment */}
                {/* <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search for a Rewards..."
                    className="p-2 border rounded  flex-grow"
                /> */}

            {(userInfo && Array.isArray(userInfo.roles) && userInfo.roles.length > 0 && (userInfo.roles[0] == 'OWNER')) ? 
            (
                <ButtonWithIcon 
                    label="Add Reward"
                    onClick={handleClickToOpen}
                    >
                </ButtonWithIcon>
            ) : 
            (
                <div>You are not allowed to view this page.</div>
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

            <Loading loading={loading} > 
                <div className="flex gap-4 flex-wrap mt-4"> 
                    {rewards.map((creward, index) => (
                        <RewardCard key={index} reward={creward}  onUpdateClick={handleClickToOpenUpdateModal} onDeleteClick={handleDeleteClick} />
                    ))} 
                </div>
            </Loading>

            <AddRewardDialog open={isRewardDialogOpen} currentShop={barberShopInfo} handleToSaveReward={handleToSave} handleToClose={handleToClose}  />
                    
            <UpdateRewardDialog open={isUpdateRewardDialogOpen} currentShop={barberShopInfo} reward={selectedRewardForUpdate} handleToSaveReward={handleClickToSaveUpdateModal} handleToClose={handleClickToCloseUpdateModal}  />

        </div>
    );
};

export default RewardsGrid;