import { useState, useEffect } from 'react';
import BarberCard from './BarberCard';
import ButtonWithIcon from '../../../components/ui/custom/barbers/ButtonWithIcon'
import AddBarberModal from './dialogs/AddBarberModal';
import useBookingServices from 'utils/hooks/useBookingService'


const BarbersGrid = () => {
    // Initialize state for the search input
    const [open, setOpen] = useState(false);

    const { getBarbers, addBarbers } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    const [search, setSearch] = useState('a');

    // Define a function to fetch and update the services
    const fetchBarbers = async () => {
        const data = await getBarbers();
        setBarbers(data);
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
            <div className="flex gap-4 flex-wrap mt-4"> 
                {filteredBarbers.map((barber, index) => (
                    <BarberCard key={index} barber={barber} />
                ))}
            </div>

            <AddBarberModal open={open} handleToClose={handleToClose} />
        </div>
    );
};

export default BarbersGrid;