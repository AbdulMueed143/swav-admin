import {  Avatar, Card } from 'components/ui'
import Button  from 'components/ui/Buttons/Button';


const PackagesCard = ({currentPackage,  onUpdateClick, onDeleteClick}) => {

    const MAX_SERVICES_DISPLAYED = 2;

    const services = currentPackage.amenities;

    const totalCost = services.reduce((total, service) => total + service.price, 0);
    const totalTime = services.reduce((total, service) => total + service.averageTimeInMinutes, 0);
    
    const discountRate = 0.1;  // for example, 10% discount
    const discountedCost = totalCost - (totalCost * discountRate);
    

      const cardFooter = (
        <div cclassName="flex flex-col items-start">
            <div className="flex items-center mb-2">
                <span>
                    <h6 className="text-sm">Total</h6>
                    <span className="text-xs"> <p>{discountedCost} AUD, {totalTime} Mins</p></span>
                </span>
            </div>

            <div className="flex">
                <Button className="mr-2 mb-2" variant="twoTone" color="red-600" onClick={() => onDeleteClick(currentPackage.id)}>
                    Delete 
                </Button>
                <Button className="mr-2 mb-2" variant="twoTone" color="green-600" onClick={() => onUpdateClick(currentPackage)}>
                    Update
                </Button>
            </div>
        </div>
    )

    return (
        <div className="max-w-xs">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                >
                <h4 className="font-bold my-3" style={{ marginBottom: '20px' }}>{currentPackage.name}</h4>
                <p className="text-sm truncate" >{currentPackage.description}</p>

                <h6 className="text-sm" style={{ marginBottom: '10px', marginTop: '5px' }}>Services</h6>
                
                <div style={{  overflow: 'hidden' }}> 
                {services.slice(0, MAX_SERVICES_DISPLAYED).map((service, index) => (
                    <div className="flex items-center" key={index} style={{ marginBottom: '10px' }}>
                        <Avatar
                            size={30}
                            className="mr-2"
                            shape="circle"
                            src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                        />
                        <span className="text-sm">{service.name}, {service.price} AUD, {service.time} Mins</span>
                    </div>
                ))}
        {services.length > MAX_SERVICES_DISPLAYED && (
            <div className="text-sm">...and more</div>
        )}
    </div>
            </Card>
        </div>
    )
}

export default PackagesCard

