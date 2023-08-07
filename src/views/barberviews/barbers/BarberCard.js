import {  Avatar, Card } from 'components/ui'

const BarberCard = ({ barber }) => {

    const { firstName, lastName, email, phoneNumber } = barber;


    const cardFooter = (
        <>
        <div className="flex items-center">

            {/* <Avatar
                size={30}
                className="mr-2"
                shape="circle"
                src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                
            /> */}
            <span>
                <h6 className="text-sm">Services</h6>
                <span className="text-xs">Hair cut, beard style</span>
            </span>
        </div>

        <div className="flex items-center">

            <span>
                <h6 className="text-sm">Detials</h6>
                <div className="text-xs">{email}</div>
                <div className="text-xs">{phoneNumber}</div>

            </span>
        </div>

        </>
    )

    const cardHeader = (
        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
            <img 
            style={{width: '100%', objectFit: 'cover'}} 
            src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="card header" />
        </div>
    )

    return (
        <div className="max-w-xs style={{ maxHeight: '240px' }}">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={cardHeader}
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                {/* <span className="text-emerald-600 font-semibold">
                    Cost 60 AUD
                </span> */}
                <h4 className="font-bold my-3">{firstName} {lastName}</h4>
                <p>
                    Famouse for styles that have never been seen by humanity.                
                </p>
            </Card>
        </div>
    )
}

export default BarberCard

