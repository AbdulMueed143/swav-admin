import { useState } from 'react';

import PackagesCard from './PackagesCard';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import AddPackageModal from '../dialog/AddPackagesModal';

const PackagesGrid = () => {
    // Initialize state for the search input
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
 
    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

    // Mock data for your packages
    const packages = [
        { name: 'Packages 1' },
        { name: 'Packages 2' },
        { name: 'Packages 3' },
    ];

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
            <div className="flex gap-4 flex-wrap mt-4"> 
                {filteredPackages.map((cpackage, index) => (
                    <PackagesCard key={index} name={cpackage.name} />
                ))}
            </div>

            <AddPackageModal open={open} handleToClose={handleToClose} /> 

        </div>
    );
};

export default PackagesGrid;