import { useState } from 'react';
import ServiceCard from './ServiceCard';
import ButtonWithIcon from '../../../components/ui/custom/barbers/ButtonWithIcon'
import { Dialog } from 'components/ui';
import AddServiceModal from './dialog/AddServiceModal';

const ServicesGrid = () => {
    // Initialize state for the search input
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
 
    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

    // Mock data for your services
    const services = [
        { name: 'Service 1' },
        { name: 'Service 2' },
        { name: 'Service 3' },
        { name: 'Service 4' },
        { name: 'Service 5' },
    ];

    // Filter the services based on the search input
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-end gap-4 items-center">  {/* Add flex, justify-end, and items-center for alignment */}
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search for a service..."
                    className="p-2 border rounded"
                />
                <ButtonWithIcon 
                    label="Add Service"
                    onClick={handleClickToOpen}
                >

                </ButtonWithIcon>

                
            </div>
            <div className="flex gap-4 flex-wrap mt-4"> 
                {filteredServices.map((service, index) => (
                    <ServiceCard key={index} name={service.name} />
                ))}
            </div>
            <AddServiceModal open={open} handleToClose={handleToClose} />

        </div>
    );
};

export default ServicesGrid;