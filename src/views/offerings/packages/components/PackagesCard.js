import {  Avatar, Card } from 'components/ui'

const PackagesCard = () => {


    const services = [
        { name: 'Hair Cut', cost: 30, time: 30 },
        { name: 'Shaving', cost: 20, time: 10 }
      ];

      const totalCost = services.reduce((total, service) => total + service.cost, 0);
      const totalTime = services.reduce((total, service) => total + service.time, 0);
    
      const discountRate = 0.1;  // for example, 10% discount
      const discountedCost = totalCost - (totalCost * discountRate);
    

      const cardFooter = (
        <div className="flex items-center">

            <span>
                <h6 className="text-sm">Total</h6>
                <span className="text-xs"> <p>{discountedCost} AUD, {totalTime} Mint</p></span>
            </span>
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
                <h4 className="font-bold my-3" style={{ marginBottom: '20px' }}>Custom Package 1</h4>
                <h6 className="text-sm" style={{ marginBottom: '10px' }}>Services</h6>
                
                {services.map((service, index) => (
                    <div className="flex items-center" key={index} style={{ marginBottom: '10px' }}>
                    <Avatar
                        size={30}
                        className="mr-2"
                        shape="circle"
                        src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    />
                    <span className="text-sm">{service.name}, {service.cost} AUD, {service.time} Mint</span>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default PackagesCard
