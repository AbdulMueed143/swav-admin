import {  Avatar, Card } from 'components/ui'

const ServiceCard = () => {
    const cardFooter = (
        <div className="flex items-center">

            <Avatar
            size={30}
            className="mr-2"
            shape="circle"
            src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            
            />
            <span>
                <h6 className="text-sm">Duration</h6>
                <span className="text-xs">Takes approx 30mint</span>
            </span>
        </div>
    )

    // const cardHeader = (
    //     <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
    //         <img 
    //         style={{maxWidth: '500px', maxHeight: '260px'}} 
    //         src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="card header" />
    //     </div>
    // )

    return (
        <div className="max-w-xs">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                // header={cardHeader}
                footer={cardFooter}
                // headerClass="p-0"
                footerBorder={false}
                // headerBorder={false}
            >
                <span className="text-emerald-600 font-semibold">
                    Cost 60 AUD
                </span>
                <h4 className="font-bold my-3">Hair Cut</h4>
                <p>
                   Best haircut in Melbourne, provided by the best barbers you have ever encountered.
                </p>
            </Card>
        </div>
    )
}

export default ServiceCard

