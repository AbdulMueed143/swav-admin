import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import ButtonWithIcon from '../../../components/ui/custom/barbers/ButtonWithIcon'
import { Dialog } from 'components/ui';
import AddServiceModal from './dialog/AddServiceModal';
import useBookingServices from 'utils/hooks/useBookingService'



const ServicesGrid = () => {
    const [open, setOpen] = useState(false);

    const { getServices, addService } = useBookingServices();
    const [services, setServices] = useState([]); // Initial state as an empty array
    const [search, setSearch] = useState('');

    // Define a function to fetch and update the services
    const fetchServices = async () => {
        const data = await getServices();
        setServices(data);
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
<div className="w-full"> {/* Ensures the container is full width */}
            <div className="flex justify-end gap-4 items-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a service..."
                className="p-2 border rounded flex-grow" // Add flex-grow to make the input take available space
            />
            <ButtonWithIcon 
                label="Add Service"
                onClick={handleClickToOpen}
            />
            </div>
            <div className="flex gap-4 flex-wrap mt-4"> 
                 {filteredServices.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))} 
            </div>
            <AddServiceModal open={open} handleToClose={handleToClose} handleServiceSave={handleServiceSave} />

        </div>
    );
};

export default ServicesGrid;