import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import ButtonWithIcon from '../../../components/ui/custom/barbers/ButtonWithIcon'
import { Dialog } from 'components/ui';
import AddServiceModal from './dialog/AddServiceModal';
import useBookingServices from 'utils/hooks/useBookingService'
import { Loading } from 'components/shared';
import Button  from 'components/ui/Buttons/Button';
import UpdateServiceModal from './dialog/UpdateServiceModal';
import Alert from 'components/ui/Alert'
import { useSelector } from 'react-redux'


const ServicesGrid = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.auth.user);

    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);

    const handleAlertClose = () => {
        setServerError(false);
        setServerErrorMessage('');
    }


    //Handling Update Model
    const [selectedUpdatableBarber, setSelectedUpdatableBarber] = useState(null);
    const [openUpdateModal, setIsUpdateModalOpen] = useState(false);
    const handleClickToOpenUpdateModal = (updateBarber) => {
        setSelectedUpdatableBarber(updateBarber);
        setIsUpdateModalOpen(true);
    };

    const handleClickToCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedUpdatableBarber(null);
    };


    const handleClickToSaveUpdateModal = async (values)  => {
        // Handle the form submission here using formValues

        console.log(values);
        //lets make call to server
        const data = await updateService(values);
        if(data.status === -1) {
            //something went wrong ...
            setServerError(true);
            setServerErrorMessage(data.message);
        }
        else {
            // Call fetchServices to refresh the services
            fetchServices();
        }

        setOpen(false);
        handleClickToCloseUpdateModal();
    }
 

    //======= End of handling Update Modal


    //Dilaog for deleting the item
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
        const data = await deleteService(selectedId);
        if(data.status === -1) {
            //something went wrong ...
             //something went wrong ...
             setLoading(false);

             setServerError(true);
             setServerErrorMessage(data.message);
        }
        else {
              // Call fetchServices to refresh the services
            fetchServices();
        }
    }

    //Dialog for updating the item


    const { getServices, addService, deleteService, updateService } = useBookingServices();
    const [services, setServices] = useState([]); // Initial state as an empty array
    const [search, setSearch] = useState('');

    // Define a function to fetch and update the services
    const fetchServices = async () => {
        const data = await getServices();
        setServices(data);
        setLoading(false);
    };
    
  useEffect(() => {
    // Call fetchServices on component mount
    fetchServices();
  }, []); // Empty dependency array means the effect will only run once
  
    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleServiceSave = async (formValues) => {
        // Handle the form submission here using formValues
        formValues.properties = {}
        console.log(formValues);

        //lets make call to server
        const data = await addService(formValues);
        if(data.status === -1) {
            //something went wrong ...
        }
        else {
              // Call fetchServices to refresh the services
            fetchServices();
        }

        setOpen(false);
    };

    const handleToClose = () => {
        setOpen(false);
    };

    // // Filter the services based on the search input
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

            <div className="w-full">
            <div className="flex justify-end gap-4 items-center">

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a service..."
                    className="p-2 border rounded flex-grow"
                />

                {(userInfo && Array.isArray(userInfo.roles) && userInfo.roles.length > 0 && (userInfo.roles[0] == 'OWNER')) ? 
                (
                    <ButtonWithIcon 
                        label="Add Service"
                        onClick={handleClickToOpen}/>
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

            <Loading loading={loading} >
                <div className="flex gap-4 flex-wrap mt-4"> 
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={index} service={service} onDeleteClick={handleDeleteClick} onUpdateClick={handleClickToOpenUpdateModal} />
                    ))} 
                </div>
            </Loading>

            <AddServiceModal open={open} handleToClose={handleToClose} handleServiceSave={handleServiceSave} />
            <UpdateServiceModal 
                updateBarberData={selectedUpdatableBarber} 
                open={openUpdateModal} 
                handleToClose={handleClickToCloseUpdateModal} 
                handleServiceUpdate={handleClickToSaveUpdateModal}  />
        </div>
    );
};

export default ServicesGrid;